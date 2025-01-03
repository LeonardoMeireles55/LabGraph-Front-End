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

  const postResults = useCallback(
    async (data: any) => {
      try {
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${
          analyticsType === 'biochemistry-analytics'
            ? API_ENDPOINTS.biochemistry
            : API_ENDPOINTS.coagulation
        }`;

        const tokenResponse = await fetch('/api/get-token');
        const { token } = await tokenResponse.json();

        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(getStatusMessage(response.status));
        }

        setStatus((prev) => ({
          ...prev,
          message: 'Data successfully uploaded',
        }));
      } catch (error) {
        throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    [analyticsType]
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus({ isProcessing: true, message: 'Processing file...' });

    try {
      const result = file.name.endsWith('.csv')
        ? await processCsvFile(file)
        : await processTextFile(file);

      if (result.success && result.data) {
        await postResults(result.data);
      } else {
        throw new Error(result.error);
      }

      setStatus({
        isProcessing: false,
        message: 'Processing complete!',
      });
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
        title='Enviar arquivo CSV ou TXT'
        className={`cursor-pointer rounded border border-borderColor bg-background px-2 py-1 text-base text-textSecondary hover:scale-110 ${
          status.isProcessing ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {status.isProcessing ? status.message : <Upload size={25} />}
      </label>
      {status.error && <p className='text-red-500 text-xs'>{status.error}</p>}
    </div>
  );
};

export default UpdateResults;
