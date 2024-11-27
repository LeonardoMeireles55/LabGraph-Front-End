// components/DateSelector.tsx
import React from 'react';

interface DateSelectorProps {
  initialDay: number;
  initialMonth: number;
  initialYear: number;
  secondDay: number;
  secondMonth: number;
  secondYear: number;
  setInitialDay: (day: number) => void;
  setInitialMonth: (month: number) => void;
  setInitialYear: (year: number) => void;
  setSecondDay: (day: number) => void;
  setSecondMonth: (month: number) => void;
  setSecondYear: (year: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  initialDay, initialMonth, initialYear, secondDay, secondMonth, secondYear,
  setInitialDay, setInitialMonth, setInitialYear, setSecondDay, setSecondMonth, setSecondYear
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-200">
        <span className="text-sm mr-1 font-medium">De:</span>
        <select
          className="bg-gray-600 text-gray-100 rounded px-2 py-1 text-sm"
          value={initialDay}
          onChange={(e) => setInitialDay(+e.target.value)}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={initialMonth}
          onChange={(e) => setInitialMonth(+e.target.value)}
        >
          {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month, i) => (
            <option key={i} value={i + 1}>{month}</option>
          ))}
        </select>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={initialYear}
          onChange={(e) => setInitialYear(+e.target.value)}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="flex items-center gap-2 text-gray-200">
        <span className="text-sm font-medium">Até:</span>
        <select
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={secondDay}
          onChange={(e) => setSecondDay(+e.target.value)}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={secondMonth}
          onChange={(e) => setSecondMonth(+e.target.value)}
        >
          {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month, i) => (
            <option key={i} value={i + 1}>{month}</option>
          ))}
        </select>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={secondYear}
          onChange={(e) => setSecondYear(+e.target.value)}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>
    </div>
  );
};

export default DateSelector;
