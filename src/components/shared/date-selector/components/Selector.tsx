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
  <div className=" p-2 md:p-4 rounded-xl border border-borderColor">
    <h2 className="text-sm font-medium text-textPrimary mb-4">
      Selecione o período:
    </h2>
    <DatePickerHelper
      startDay={startDay}
      startMonth={startMonth}
      startYear={startYear}
      endDay={endDay}
      endMonth={endMonth}
      endYear={endYear}
      handleFullStartDate={handleFullStartDate}
      handleFullEndDate={handleFullEndDate}
    />
  </div>
);

export default Selector;
