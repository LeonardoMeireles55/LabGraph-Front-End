import React, { useState, useCallback } from 'react';

interface ProcessedData {
  date: string;
  level_lot: string;
  test_lot: string;
  level: string;
  unit_value: string;
  name: string;
  value: string;
  mean: string;
  sd: string;
}

interface ProcessingStatus {
  isProcessing: boolean;
  message: string;
  error?: string;
}

const UpdateResults: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: ''
  });

  const processArchive = useCallback(async (file: File) => {
    setStatus({ isProcessing: true, message: 'Processing archive...' });
    const MAX_VALUE = 1000000;
    const arrayValues: ProcessedData[] = [];
    const uniqueEntries = new Set<string>();
    const filteredLines: string[] = [];

    try {
      const content = await file.text();
      const lines = content.split('\n').map(line => line.trim());

      for (const line of lines) {
        if (line.includes("PCCC1") || line.includes("PCCC2")) {
          filteredLines.push(line);
        }
      }

      const extractDate = (line: string) => {
        const steps = line.split(';');
        const dates = steps[4];
        return dates;
      };

      const sortedLines = filteredLines.sort((a, b) => {
        const dateA = extractDate(a);
        const dateB = extractDate(b);
        return dateA.localeCompare(dateB);
      });

      for (const line of sortedLines) {
        const fields = line.split(';').map(field => field.replace(/"/g, '').trim());
        const date = `${fields[4]}/${fields[5]}`;
        const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${date.slice(9)}`;

        const valueTest = fields[10];

        try {
          const valueTestFloat = parseFloat(valueTest);
          if (valueTestFloat > MAX_VALUE) {
            console.log(`Value out of range: ${valueTest}. Skipping entry.`);
            continue;
          }
        } catch (error) {
          console.log(`Invalid value: ${valueTest}. Skipping entry.`);
          continue;
        }

        const entryData: ProcessedData = {
          date: formattedDate,
          level_lot: fields[16],
          test_lot: fields[17],
          level: fields[15],
          unit_value: fields[12],
          name: fields[9],
          value: valueTest,
          mean: fields[20],
          sd: fields[21]
        };

        const entryKey = JSON.stringify([
          entryData.date, entryData.level_lot, entryData.test_lot,
          entryData.level, entryData.unit_value, entryData.name,
          entryData.value, entryData.mean, entryData.sd
        ]);

        if (!uniqueEntries.has(entryKey)) {
          uniqueEntries.add(entryKey);
          arrayValues.push(entryData);
        }
      }

      await postResults(arrayValues);
      setStatus({ isProcessing: false, message: 'Processing complete!' });

      const filteredFile = sortedLines.join('\n');
      await saveFilteredFile(filteredFile);

    } catch (error) {
      setStatus({
        isProcessing: false,
        message: 'Processing failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }, []);

  const saveFilteredFile = async (filteredContent: string) => {
    const file = new Blob([filteredContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'archive_filtered.txt';
    link.click();
  };

  const postResults = async (data: ProcessedData[]) => {
    const endpointUrl = 'https://leomeireles-dev.xyz/api/biochemistry-analytics';
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('POST successful');
        setStatus(prev => ({ ...prev, message: 'Data successfully uploaded' }));
      } else {
        throw new Error(`POST failed. Status code: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error posting results: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processArchive(file);
    }
  };

  return (
    <div className="flex items-center mr-4 gap-0 text-textSecondary">
      <input
        type="file"
        id="fileInput"
        onChange={handleFileUpload}
        accept=".txt"
        className="hidden"
        disabled={status.isProcessing}
      />
      <label
        htmlFor="fileInput"
        className={`bg-muted text-textSecondary rounded px-2 py-1 text-sm cursor-pointer 
          ${status.isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {status.isProcessing ? 'Processando...' : 'Atualizar'}
      </label>
    </div>
  );
};

export default UpdateResults;
