import React, { useState } from 'react';
import { parse } from 'json2csv';

interface CsvGeneratorProps {
    jsonData: any | any[];
    fileName?: string;
}

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
        } catch (error) {
            console.error('Erro ao gerar o CSV:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={generateCsv}
            className={`text-white bg-primary hover:scale-105 rounded-lg shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isGenerating}
            aria-label="Exportar CSV"
        >
            {isGenerating ? 'Gerando...' : 'Gerar Relatorio em CSV'}
        </button>
    );
};

export default GenerateReports;
