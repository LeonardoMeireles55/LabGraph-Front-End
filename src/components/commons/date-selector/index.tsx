import React from 'react';
import SingleDateSelector from './components/SingleDateSelector';

interface DateSelectorProps {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  handleStartDayChange: (day: number) => void;
  handleStartMonthChange: (month: number) => void;
  handleStartYearChange: (year: number) => void;
  handleEndDayChange: (day: number) => void;
  handleEndMonthChange: (month: number) => void;
  handleEndYearChange: (year: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear,
  handleStartDayChange,
  handleStartMonthChange,
  handleStartYearChange,
  handleEndDayChange,
  handleEndMonthChange,
  handleEndYearChange
}) => {
  return (
    <div className="space-y-1 md:space-y-2">
      <SingleDateSelector
        label="De"
        day={startDay}
        month={startMonth}
        year={startYear}
        onDayChange={handleStartDayChange}
        onMonthChange={handleStartMonthChange}
        onYearChange={handleStartYearChange}
      />
      <SingleDateSelector
        label="Até"
        day={endDay}
        month={endMonth}
        year={endYear}
        onDayChange={handleEndDayChange}
        onMonthChange={handleEndMonthChange}
        onYearChange={handleEndYearChange}
      />
    </div>
  );
};

export default DateSelector;