import React from 'react';

interface DaySelectorProps {
    selectedDay: number;
    onDayChange: (day: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onDayChange }) => {
    return (
        <select
            className="rounded border border-borderColor bg-background p-0 text-sm text-textSecondary md:px-2 md:py-1"
            value={selectedDay}
            onChange={(e) => onDayChange(+e.target.value)}
        >
            {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1}
                </option>
            ))}
        </select>
    );
};

export default DaySelector;
