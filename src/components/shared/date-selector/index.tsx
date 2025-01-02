import React from 'react';
import Selector from './components/Selector';
import { DateSelectorProps } from './types/dateSelectorProps';



const DateSelector: React.FC<DateSelectorProps> = ({
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear,
  handleFullStartDate,
  handleFullEndDate
}) => {
  return (
    <div className="">
      <Selector
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        handleFullStartDate={handleFullStartDate}
        handleFullEndDate={handleFullEndDate} />
    </div>
  );
};

export default DateSelector;