import React from 'react';
import { MonthSelectorProps } from '../types/dateSelectorProps';

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <select
      className='rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 focus:ring-borderColor/30'
      value={selectedMonth}
      onChange={(e) => onMonthChange(+e.target.value)}
    >
      {months.map((month, i) => (
        <option key={i} value={i + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
