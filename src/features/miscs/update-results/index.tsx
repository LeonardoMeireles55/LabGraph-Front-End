import { useToken } from '@/features/authentication/contexts/TokenContext';
import { processCsvFile, processTextFile } from '@/features/shared/utils/helpers/fileProcessors';
import { Upload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { ProcessingStatus } from '../../charts/types/Chart';
import getStatusMessage from '../../shared/utils/helpers/getStatusMessage';
import { API_ENDPOINTS } from '../csv-generator/constants/fileProcessing';

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: '',
  });
  const { token, loading } = useToken();

  const postResults = useCallback(
    async (data: any) => {
      if (loading) return;

      if (!token) {
        setStatus({
          isProcessing: false,
          message: 'Authentication failed',
          error: 'No authentication token available',
        });
        return;
      }

      try {
        const endpoint =
          analyticsType === 'biochemistry-analytics'
            ? API_ENDPOINTS.biochemistry
            : API_ENDPOINTS.coagulation;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(getStatusMessage(response.status));
        setStatus((prev) => ({
          ...prev,
          message: 'Data successfully uploaded',
        }));
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
      }
    },
    [analyticsType, token, loading]
  );

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
    <div className='flex items-center gap-0 text-textSecondary'>
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
        className={`cursor-pointer rounded border border-borderColor bg-background px-2 py-1 text-base text-textSecondary shadow-sm shadow-shadow hover:scale-110 md:px-2 md:py-1 ${
          status.isProcessing ? 'cursor-not-allowed opacity-25' : ''
        }`}
      >
        <span className='hidden py-0.5 md:inline'>
          {status.isProcessing ? status.message : <Upload size={21} />}
        </span>
        <span className='inline py-0.5 md:hidden'>
          {status.isProcessing ? status.message : <Upload size={17} />}
        </span>
      </label>
      {status.error && (
        <p className='ml-2 rounded-3xl text-xs text-textPrimary md:bg-danger md:px-1 md:py-2 md:text-white'>
          {status.error}
        </p>
      )}
    </div>
  );
};

export default UpdateResults;
