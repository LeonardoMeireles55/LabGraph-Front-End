import { ProcessedData } from './chartInterfaces';

export interface FileProcessingResult {
    success: boolean;
    data?: ProcessedData[];
    error?: string;
}

export interface DateExtractor {
    (line: string): string;
}
