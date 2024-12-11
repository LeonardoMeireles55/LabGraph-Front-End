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

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: ''
  });

  const cleanValue = (value: string) => value.replace(/"/g, '').trim();

  const postResults = useCallback(
    async (data: ProcessedData[]) => {
      const endpointUrl = analyticsType === 'biochemistry-analytics'
        ? 'https://leomeireles-dev.xyz/api/biochemistry-analytics'
        : 'https://leomeireles-dev.xyz/api/coagulation-analytics';

      try {
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setStatus(prev => ({ ...prev, message: 'Data successfully uploaded' }));
        } else {
          throw new Error(`POST failed. Status code: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Error posting results: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    [analyticsType]
  );

  const processArchive = useCallback(
    async (file: File) => {
      setStatus({ isProcessing: true, message: 'Processing archive...' });
      const MAX_VALUE = 1000000;
      const arrayValues: ProcessedData[] = [];
      const uniqueEntries = new Set<string>();
      const filteredLines: string[] = [];

      if (analyticsType !== 'coagulation') {
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
            return steps[4];
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

        } catch (error) {
          setStatus({
            isProcessing: false,
            message: 'Processing failed',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
          });
        }
      }
    },
    [analyticsType, postResults]
  );

  const processCsvFile = useCallback(
    async (file: File) => {
      setStatus({ isProcessing: true, message: 'Processing CSV file...' });
      const MAX_VALUE = 1000000;
      const arrayValues: ProcessedData[] = [];

      try {
        const content = await file.text();
        const lines = content.split('\n').map(line => line.trim());

        for (const line of lines) {
          const data = line.split(',');

          if (data.length < 56) {
            console.warn(`Skipping line due to insufficient columns: ${line}`);
            continue;
          }

          const date = `${data[48]}`;
          const formattedDate = `${date.slice(7, 11)}${date.slice(3, 6)}-${date.slice(1, 3)}${date.slice(11)}`;

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

        await postResults(arrayValues);
        setStatus({ isProcessing: false, message: 'Processing complete!' });

      } catch (error) {
        setStatus({
          isProcessing: false,
          message: 'Processing failed',
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    },
    [postResults]
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        processCsvFile(file);
      } else {
        processArchive(file);
      }
    }
  };

  return (
    <div className="flex items-center mr-4 gap-0 text-textSecondary">
      <input
        type="file"
        id="fileInput"
        onChange={handleFileUpload}
        accept=".txt, .csv"
        className="hidden"
        disabled={status.isProcessing}
      />
      <label
        htmlFor="fileInput"
        className={`bg-background border border-textSecondary/25 text-textSecondary rounded px-2 py-1 text-sm cursor-pointer hover:scale-110 ${status.isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {status.isProcessing ? status.message : 'Atualizar'}
      </label>
      {status.error && (
        <p className="text-red-500 text-xs">{status.error}</p>
      )}
    </div>
  );
};

export default UpdateResults;
