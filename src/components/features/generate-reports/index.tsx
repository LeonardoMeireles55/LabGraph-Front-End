import { parse } from 'json2csv';
import { Download, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import getStatusMessage from '../../utils/helpers/getStatusMessage';
import { CsvGeneratorProps } from '../types/CsvGenerator';

const GenerateReports: React.FC<CsvGeneratorProps> = ({ jsonData, fileName = 'data.csv' }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCsv = () => {
    if (isGenerating) return;
    if (!jsonData) return;
    setIsGenerating(true);

    try {
      const csv = parse(jsonData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: Error | any) {
      console.log(error);
      alert('Error generating CSV: ' + getStatusMessage(error.status));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateCsv}
      disabled={isGenerating}
      className={`flex items-center justify-evenly rounded-lg px-1 py-1 text-textPrimary transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'} `}
      aria-label='Export CSV'
    >
      {isGenerating ? (
        <Loader2 className='w-5 h-5 mr-2 animate-spin' />
      ) : (
        <Download className='w-5 h-5 mr-2' />
      )}
      <span>Generate Report</span>
    </button>
  );
};

export default GenerateReports;
