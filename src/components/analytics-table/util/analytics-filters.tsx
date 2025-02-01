
import React from 'react';
import DateSelector from '@/components/shared/date-selector';

interface AnalyticsFiltersProps {
    dateSelector: any;
    analyticsOptions: { value: string; label: string }[];
    analyticsType: string;
    setAnalyticsType: (value: string) => void;
    levelOptions: { value: string; label: string }[];
    level: string;
    setLevel: (value: string) => void;
    setFiltered: (value: boolean) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
    dateSelector,
    analyticsOptions,
    analyticsType,
    setAnalyticsType,
    levelOptions,
    level,
    setLevel,
    setFiltered,
}) => {
    return (
        <div className='mb-4 mt-16 grid grid-cols-2 content-center items-center justify-start md:mb-4 md:flex'>
            <div className='mt-4 w-full md:mt-14 md:w-auto'>
                <DateSelector {...dateSelector} />
                <label htmlFor='tests' className='flex items-center gap-1 text-textSecondary'>
                    Test:
                    <select
                        id='tests'
                        value={analyticsType}
                        onChange={(e) => setAnalyticsType(e.target.value)}
                        className='mt-1 rounded border border-borderColor bg-background text-textSecondary md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 focus:ring-borderColor/30'
                    >
                        {analyticsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor='level' className='flex items-center gap-2 text-textSecondary'>
                    Level:
                    <select
                        id='level'
                        value={level}
                        onChange={(e) => {
                            setLevel(e.target.value);
                            setFiltered(e.target.value !== '0');
                        }}
                        className='mt-1 rounded border border-borderColor bg-background text-textSecondary md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 focus:ring-borderColor/30'
                    >
                        {levelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default AnalyticsFilters;