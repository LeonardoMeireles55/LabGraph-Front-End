interface AnalyticsTypeSelectorProps {
  analyticsType: string;
  onChange: (value: string) => void;
}

const AnalyticsTypeSelector = ({ analyticsType, onChange }: AnalyticsTypeSelectorProps) => {
  return (
    <select
      className='rounded-md border border-borderColor bg-background text-xs text-textSecondary md:text-sm'
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
