import React from 'react';
import { SingleDateSelectorProps } from '../types/dateSelectorProps';
import DatePickerHelper from '../../date-picker';

const Selector: React.FC<SingleDateSelectorProps> = ({
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear,
  handleFullStartDate,
  handleFullEndDate

}) => (
  <div className="flex items-center gap-2">
    <span className="font-medium md:text-sm"></span>
    <DatePickerHelper startDay={startDay} startMonth={startMonth} startYear={startYear} endDay={endDay} endMonth={endMonth} endYear={endYear} handleFullStartDate={handleFullStartDate} handleFullEndDate={handleFullEndDate} />
  </div>
);

export default Selector;
