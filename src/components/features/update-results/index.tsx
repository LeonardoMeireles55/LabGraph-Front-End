import { Upload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { processCsvFile, processTextFile } from '../../../utils/fileProcessors';
import { ProcessingStatus } from '../../charts/types/Chart';
import getStatusMessage from '../../utils/helpers/getStatusMessage';
import { API_ENDPOINTS } from '../csv-generator/constants/fileProcessing';

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: '',
  });

  const postResults = useCallback(async (data: any) => {
    try {
      const endpoint = analyticsType === 'biochemistry-analytics'
        ? API_ENDPOINTS.biochemistry
        : API_ENDPOINTS.coagulation;
      const endpointUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
      const { token } = await (await fetch('/api/get-token')).json();
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(getStatusMessage(response.status));
      setStatus((prev) => ({ ...prev, message: 'Data successfully uploaded' }));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [analyticsType]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus({ isProcessing: true, message: 'Processing file...' });
    try {
      const result = file.name.endsWith('.csv')
        ? await processCsvFile(file)
        : await processTextFile(file);
      if (!result.success || !result.data) throw new Error(result.error);
      await postResults(result.data);
      setStatus({ isProcessing: false, message: 'Processing complete!' });
      window.location.reload();
    } catch (error) {
      setStatus({
        isProcessing: false,
        message: 'Processing failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  return (
    <div className='mr-4 flex items-center gap-0 text-textSecondary'>
      <input
        type='file'
        id='fileInput'
        onChange={handleFileUpload}
        accept='.txt, .csv'
        className='hidden'
        disabled={status.isProcessing}
      />
      <label
        htmlFor='fileInput'
        title='Send analytics results TXT or CSV file'
        className={`cursor-pointer rounded border border-borderColor bg-background px-2 py-1 md:px-2 md:py-1 text-base text-textSecondary hover:scale-110 ${status.isProcessing ? 'cursor-not-allowed opacity-50' : ''
          }`}
      >
        <span className='hidden md:inline py-0.5'>
          {status.isProcessing ? status.message : <Upload size={21} />}

        </span>
        <span className='inline md:hidden py-0.5'>
          {status.isProcessing ? status.message : <Upload size={17} />}

        </span>
      </label>
      {status.error && <p className='ml-2 text-textPrimary md:text-white md:py-2 md:px-1 md:bg-danger rounded-3xl text-xs'>{status.error}</p>}
    </div>
  );
};

export default UpdateResults;
