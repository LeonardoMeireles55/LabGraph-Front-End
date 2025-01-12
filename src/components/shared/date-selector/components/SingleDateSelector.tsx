import React from 'react';
import { SingleDateSelectorProps } from '../types/dateSelectorProps';
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';

const SingleDateSelector: React.FC<SingleDateSelectorProps> = ({
  label,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => (
  <div className='flex items-center gap-2 text-textSecondary'>
    <span className='font-medium md:text-sm'>{label}:</span>
    <DaySelector selectedDay={day} onDayChange={onDayChange} />
    <MonthSelector selectedMonth={month} onMonthChange={onMonthChange} />
    <YearSelector selectedYear={year} onYearChange={onYearChange} />
  </div>
);

export default SingleDateSelector;
