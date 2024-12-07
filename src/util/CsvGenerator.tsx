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
      className="text-white group inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90  rounded-lg 
                 shadow-sm transition-colors duration-200"
    >
      {/* Ícone de download feito com CSS */}
        CSV
    </button>
  );
};

export default CsvGenerator;