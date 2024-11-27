import React from 'react';

interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onDayChange }) => {
  return (
    <select
      className="bg-muted text-gray-100 rounded px-2 py-1 text-sm"
      value={selectedDay}
      onChange={(e) => onDayChange(+e.target.value)}
    >
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
  );
};

export default DaySelector;
