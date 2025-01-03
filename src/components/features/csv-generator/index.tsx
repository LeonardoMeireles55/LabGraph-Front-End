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
        className={`flex items-center justify-center rounded-lg px-1 py-1 text-textPrimary transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'} `}
        aria-label='Export CSV'
      >
        {isGenerating ? (
          <Loader2 className='w-5 h-5 mr-2 animate-spin' />
        ) : (
          <Download className='w-5 h-5 mr-2' />
        )}
        <span>{buttonText}</span>
      </button>

      {error && (
        <div className='max-w-full px-1 py-1 text-sm text-center break-words border border-red-200 rounded-lg bg-red-50 text-danger'>
          {error}
        </div>
      )}
    </div>
  );
};

export default CsvGenerator;
