import { ListingItem } from '@/features/charts/types/Chart';
import GenerateReports from '@/features/features/generate-reports';
import AnalyticsTypeSelector from '@/features/reports/analytics-type-selector';
import DateSelector from '@/features/shared/date-selector';
import { DateSelectorProps } from '@/features/shared/date-selector/types/dateSelectorProps';

interface ReportsControlsProps extends DateSelectorProps {
  analyticsType: string;
  onAnalyticsTypeChange: (value: string) => void;
  dataFetched: ListingItem[];
  dateSelectorProps: DateSelectorProps;
}

const ReportsControls = ({
  analyticsType,
  onAnalyticsTypeChange,
  dataFetched,
  dateSelectorProps,
}: ReportsControlsProps) => (
  <div className='grid gap-2 text-textSecondary md:flex xl:mt-14'>
    <DateSelector {...dateSelectorProps} />
    <AnalyticsTypeSelector analyticsType={analyticsType} onChange={onAnalyticsTypeChange} />
    <span className='flex justify-evenly rounded-md border border-borderColor text-textSecondary shadow-sm shadow-shadow'>
      <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
    </span>
  </div>
);

export default ReportsControls;
