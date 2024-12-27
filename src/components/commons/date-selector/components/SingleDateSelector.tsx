import React from 'react';
import YearSelector from './YearSelector';
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';


interface SingleDateSelectorProps {
  label: string;
  day: number;
  month: number;
  year: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const SingleDateSelector: React.FC<SingleDateSelectorProps> = ({
  label,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => (
  <div className="flex items-center gap-2 text-textSecondary">
    <span className="font-medium md:text-sm">{label}:</span>
    <DaySelector selectedDay={day} onDayChange={onDayChange} />
    <MonthSelector selectedMonth={month} onMonthChange={onMonthChange} />
    <YearSelector selectedYear={year} onYearChange={onYearChange} />
  </div>
);

export default SingleDateSelector;
