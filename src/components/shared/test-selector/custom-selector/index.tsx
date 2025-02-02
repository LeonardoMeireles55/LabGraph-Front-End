import useFetchListeningGrouped from '@/components/charts/multiple-line/hooks/useFetchListiningGrouped';
import urlByNameAndDateNew from '@/components/shared/utils/helpers/urlByNameAndDateNew';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import UpdateResults from '../../../features/update-results';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import { TestSelectorProps } from '../types/Selector';

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({
  list,
  analyticsType,
  name,
  setListinig,
}) => {
  const [testName, setTestName] = useState<string>(name);
  const {
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  } = useDateSelector();

  const { url } = urlByNameAndDateNew({
    name: testName,
    date: { startDay, startMonth, startYear, endDay, endMonth, endYear },
    analyticsType,
  });

  const { listing } = useFetchListeningGrouped(url);

  useEffect(() => {
    setListinig(listing);
  }, [url, listing, setListinig]);

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK;

  return (
    <div className='mt-12 grid content-center items-center gap-4 text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
      <DateSelector
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        handleStartDayChange={handleStartDayChange}
        handleStartMonthChange={handleStartMonthChange}
        handleStartYearChange={handleStartYearChange}
        handleEndDayChange={handleEndDayChange}
        handleEndMonthChange={handleEndMonthChange}
        handleEndYearChange={handleEndYearChange}
      />
      <div className='flex flex-row content-center items-center justify-between gap-3'>
        <span className='font-medium text-sm'>Test:</span>
        <select
          className='rounded-md border border-borderColor bg-background px-0.5 py-0.5 md:px-2 md:py-1 text-sm text-textSecondary shadow-sm transition-all duration-200 hover:border-borderColor/80 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {list.map((test) => (
            <option key={test} value={test}>
              {test}
            </option>
          ))}
        </select>
        <span className='flex flex-row content-center items-center justify-center'>
          <Link
            className='flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 md:px-2 md:py-1 text-sm font-medium text-textSecondary shadow-sm transition-all duration-200 hover:scale-110 hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
            target='_blank'
            href={GOOGLE_SHEET_URL || ''}
          >
            <span className='hidden md:inline px-0.5 py-0.5'>
              <CheckCircle size={19} />
            </span>
            <span className='inline md:hidden px-0.5 py-0.5'>
              <CheckCircle size={17} />
            </span>
          </Link>
        </span>
        <div className='hidden w-full md:flex'>
          <UpdateResults analyticsType={analyticsType} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TestSelectorWithoutLevel);
