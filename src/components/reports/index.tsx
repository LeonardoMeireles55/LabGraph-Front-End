import useReportsData from '@/components/reports/hooks/useReportsData';
import ReportImage from '@/components/reports/report-image';
import ReportsControls from '@/components/reports/reports-controls';
import ReportsHeader from '@/components/reports/reports-header';
import {
  formatDateWithTime,
  formatEndDateWithTime,
} from '@/components/shared/date-selector/constants/formatDateWithTime';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import { DateSelectorProps } from '@/components/shared/date-selector/types/dateSelectorProps';
import Footer from '@/components/shared/ui/footer';
import { useState } from 'react';

const Reports = () => {
  const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');
  const dateSelector = useDateSelector();

  const { startDay, startMonth, startYear, endDay, endMonth, endYear } =
    dateSelector as DateSelectorProps;

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${
    process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS
  }startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatEndDateWithTime(
    endYear,
    endMonth,
    endDay
  )}`;

  const { dataFetched } = useReportsData({ url });

  return (
    <div className='flex flex-col min-h-screen justify-evenly'>
      <ReportsHeader analyticsType={analyticsType} dataFetched={dataFetched} />
      <main className='flex flex-col items-center flex-grow mt-16 justify-evenly bg-background xl:mt-16'>
        <ReportsControls
          analyticsType={analyticsType}
          onAnalyticsTypeChange={setAnalyticsType}
          dataFetched={dataFetched}
          dateSelectorProps={dateSelector}
          {...dateSelector}
        />
        <ReportImage />
        <div className='flex flex-col items-center content-end justify-end mt-16'>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Reports;
