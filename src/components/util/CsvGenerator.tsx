import React, { useState } from 'react';
import { parse } from 'json2csv';
import { Download, Loader2 } from 'lucide-react';

interface CsvGeneratorProps {
  jsonData: any | any[];
  fileName?: string;
  buttonText?: string;
  className?: string;
}

const CsvGenerator: React.FC<CsvGeneratorProps> = ({
  jsonData,
  fileName = 'data.csv',
  buttonText = 'CSV',
  className = ''
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
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <button
        onClick={generateCsv}
        disabled={isGenerating}
        className={`
          flex items-center justify-center 
          px-4 py-2 
          text-textPrimary
          rounded-lg 
          focus:outline-none 
          focus:ring-0 
          transition-all 
          duration-300 
          ease-in-out
          ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
        `}
        aria-label="Export CSV"
      >
        {isGenerating ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Download className="w-5 h-5 mr-2" />
        )}
        <span>{buttonText}</span>
      </button>

      {error && (
        <div
          className="
            bg-red-50 
            border 
            border-red-200 
            text-red-600 
            px-4 
            py-2 
            rounded-lg 
            text-sm 
            text-center
            max-w-full
            break-words
          "
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default CsvGenerator;