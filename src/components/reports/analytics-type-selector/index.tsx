interface AnalyticsTypeSelectorProps {
  analyticsType: string;
  onChange: (value: string) => void;
}

const AnalyticsTypeSelector = ({ analyticsType, onChange }: AnalyticsTypeSelectorProps) => {
  return (
    <select
      className='text-xs border rounded-md border-borderColor bg-background text-textSecondary md:text-sm'
      value={analyticsType}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={'biochemistry-analytics'}>BIOCHEMISTRY</option>
      <option value={'hematology-analytics'}>HEMATOLOGY</option>
      <option value={'coagulation-analytics'}>COAGULATION</option>
    </select>
  );
};

export default AnalyticsTypeSelector;
