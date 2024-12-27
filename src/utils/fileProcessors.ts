import { ProcessedData } from '../types/chartInterfaces';
import { FileProcessingResult } from '../types/fileProcessing';
import { MAX_VALUE, CSV_MINIMUM_COLUMNS } from '../constants/fileProcessing';

export const cleanValue = (value: string) => value.replace(/"/g, '').trim();

export const processTextFile = async (file: File): Promise<FileProcessingResult> => {
    const arrayValues: ProcessedData[] = [];
    const uniqueEntries = new Set<string>();
    const filteredLines: string[] = [];

    try {
        const content = await file.text();
        const lines = content.split('\n').map((line) => line.trim());

        // Filter PCCC lines
        lines.forEach(line => {
            if (line.includes('PCCC1') || line.includes('PCCC2')) {
                filteredLines.push(line);
            }
        });

        // Sort by date
        const sortedLines = filteredLines.sort((a, b) => {
            const dateA = a.split(';')[4];
            const dateB = b.split(';')[4];
            return dateA.localeCompare(dateB);
        });

        for (const line of sortedLines) {
            const fields = line.split(';').map(cleanValue);
            const date = `${fields[4]}/${fields[5]}`;
            const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${date.slice(9)}`;
            
            if (!isValidValue(fields[10])) continue;

            const entryData = createProcessedData(fields, formattedDate);
            const entryKey = JSON.stringify(Object.values(entryData));

            if (!uniqueEntries.has(entryKey)) {
                uniqueEntries.add(entryKey);
                arrayValues.push(entryData);
            }
        }

        return { success: true, data: arrayValues };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error occurred' 
        };
    }
};

export const processCsvFile = async (file: File): Promise<FileProcessingResult> => {
    const arrayValues: ProcessedData[] = [];

    try {
        const content = await file.text();
        const lines = content.split('\n').map((line) => line.trim());

        for (const line of lines) {
            const data = line.split(',');

            if (data.length < CSV_MINIMUM_COLUMNS) {
                console.warn(`Skipping line due to insufficient columns: ${line}`);
                continue;
            }

            if (!isValidValue(data[49])) continue;

            const date = `${data[48]}`;
            const formattedDate = `${date.slice(7, 11)}${date.slice(3, 6)}-${date.slice(1, 3)}${date.slice(11)}`;

            const entryData: ProcessedData = {
                date: cleanValue(formattedDate),
                level_lot: cleanValue(data[55]),
                test_lot: 'nao se aplica',
                level: cleanValue(data[3]),
                unit_value: cleanValue(data[51]),
                name: cleanValue(data[1]),
                value: cleanValue(data[49]),
                mean: cleanValue(data[9]),
                sd: cleanValue(data[15]),
            };

            arrayValues.push(entryData);
        }

        return { success: true, data: arrayValues };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error occurred' 
        };
    }
};

const isValidValue = (value: string): boolean => {
    try {
        const numValue = parseFloat(cleanValue(value));
        return !isNaN(numValue) && numValue <= MAX_VALUE;
    } catch {
        return false;
    }
};

const createProcessedData = (fields: string[], formattedDate: string): ProcessedData => ({
    date: formattedDate,
    level_lot: fields[16],
    test_lot: fields[17],
    level: fields[15],
    unit_value: fields[12],
    name: fields[9],
    value: fields[10],
    mean: fields[20],
    sd: fields[21],
});
