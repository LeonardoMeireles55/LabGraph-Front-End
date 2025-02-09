import { ListingItem } from '@/components/charts/types/Chart';
import GenerateReports from '@/components/features/generate-reports';
import AnalyticsTypeSelector from '@/components/reports/analytics-type-selector';
import DateSelector from '@/components/shared/date-selector';
import { DateSelectorProps } from '@/components/shared/date-selector/types/dateSelectorProps';

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
    <span className='flex justify-evenly rounded-md shadow-sm shadow-shadow border border-borderColor text-textSecondary'>
      <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
    </span>
  </div>
);

export default ReportsControls;
