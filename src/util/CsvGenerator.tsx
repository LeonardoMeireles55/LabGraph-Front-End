import React from 'react';
import { parse } from 'json2csv';

interface CsvGeneratorProps {
  jsonData: any | any[];
  fileName?: string;
}

const CsvGenerator: React.FC<CsvGeneratorProps> = ({ jsonData, fileName = 'data.csv' }) => {
  const generateCsv = () => {
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
    } catch (error) {
      console.error('Erro ao gerar o CSV:', error);
    }
  };

  return (
    <button
      onClick={generateCsv}
      className="flex flex-col text-xs justify-center text-center bg-green text-white gap-2 px-4 py-2 rounded-lg shadow-sm"
    >
 <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="8" y1="2" x2="8" y2="22" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="2" y1="14" x2="22" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>

    </button>
  );
};

export default CsvGenerator;