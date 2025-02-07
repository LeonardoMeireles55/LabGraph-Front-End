import { parse } from 'json2csv';
import { Download, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { CsvGeneratorProps } from '../types/CsvGenerator';

const CsvGenerator: React.FC<CsvGeneratorProps> = ({
  jsonData,
  fileName = 'data.csv',
  buttonText = 'CSV',
  className = '',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCsv = () => {
    if (isGenerating || !jsonData) return;

    setIsGenerating(true);
    setError(null);

    try {
      const csv = parse(jsonData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating CSV:', err);
      setError('Failed to generate CSV. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <button
        onClick={generateCsv}
        disabled={isGenerating}
        className={`flex items-center justify-center rounded-lg p-1 text-textPrimary transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'} `}
        aria-label='Export CSV'
      >
        {isGenerating ? (
          <Loader2 className='mr-2 size-5 animate-spin' />
        ) : (
          <Download className='mr-2 size-5' />
        )}
        <span>{buttonText}</span>
      </button>

      {error && (
        <div className='max-w-full break-words rounded-lg border bg-danger p-1 text-center text-sm text-danger'>
          {error}
        </div>
      )}
    </div>
  );
};

export default CsvGenerator;
