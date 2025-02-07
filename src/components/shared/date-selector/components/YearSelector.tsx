import { YearSelectorProps } from '../types/dateSelectorProps';

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  const years = [2023, 2024, 2025];
  return (
    <select
      className='focus:ring-borderColor/30 rounded border border-borderColor bg-background p-0 text-textSecondary focus:outline-none focus:ring-2 md:px-2 md:py-1 md:text-sm'
      value={selectedYear}
      onChange={(e) => onYearChange(+e.target.value)}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
