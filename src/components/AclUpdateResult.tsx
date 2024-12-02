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

const AclUpdateResults: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: ''
  });

  const cleanValue = (value: string) => value.replace(/"/g, '').trim();

  const processCsvFile = useCallback(async (file: File) => {
    setStatus({ isProcessing: true, message: 'Processing CSV file...' });

    const MAX_VALUE = 1000000;
    const arrayValues: ProcessedData[] = [];

    try {
      const content = await file.text();
      const lines = content.split('\n').map(line => line.trim());

      for (const line of lines) {
        const data = line.split(','); // Assume CSV uses ',' as delimiter

        if (data.length < 56) {
          console.warn(`Skipping line due to insufficient columns: ${line}`);
          continue;
        }

        // Process the date
        const date = `${data[48]}`;
        const formattedDate = `${date.slice(7, 11)}${date.slice(3, 6)}-${date.slice(1, 3)}${date.slice(11)}`;

        // Process the test value
        const valueTest = cleanValue(data[49]);

        let valueTestFloat: number;
        try {
          valueTestFloat = parseFloat(valueTest);
          if (valueTestFloat > MAX_VALUE || isNaN(valueTestFloat)) {
            console.warn(`Value out of range or invalid: ${valueTest}. Skipping entry.`);
            continue;
          }
        } catch (error) {
          console.warn(`Invalid value: ${valueTest}. Skipping entry.`);
          continue;
        }

        

        // Create entry for processed data
        const entryData: ProcessedData = {
          date: cleanValue(formattedDate),
          level_lot: cleanValue(data[55]),
          test_lot: 'nao se aplica',
          level: cleanValue(data[3]),
          unit_value: cleanValue(data[51]),
          name: cleanValue(data[1]),
          value: cleanValue(valueTest),
          mean: cleanValue(data[9]),
          sd: cleanValue(data[15])
        };

        arrayValues.push(entryData);
      }

      const jsonOutput = JSON.stringify(arrayValues, null, 4);
      await saveJsonFile(jsonOutput);
      await postResults(arrayValues);

      setStatus({ isProcessing: false, message: 'Processing complete!' });

    } catch (error) {
      setStatus({
        isProcessing: false,
        message: 'Processing failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }, []);

  const saveJsonFile = async (jsonContent: string) => {
    const file = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'acl.json';
    link.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processCsvFile(file);
    }
  };

  const postResults = async (data: ProcessedData[]) => {
    const endpointUrl = 'https://68.183.141.155/biochemistry-analytics';
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

  return (
    <div className="flex items-center mr-8 gap-0 text-textSecondary">
      <input
        type="file"
        id="fileInput"
        onChange={handleFileUpload}
        accept=".csv"
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
      {status.error && <div className="mt-2 text-red-500">{status.error}</div>}
    </div>
  );
};

export default AclUpdateResults;
