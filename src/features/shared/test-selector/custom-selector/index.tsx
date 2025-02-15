import useFetchListeningGrouped from '@/features/charts/multiple-line/hooks/useFetchListiningGrouped';
import urlByNameAndDateNew from '@/features/shared/utils/helpers/urlByNameAndDateNew';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import UpdateResults from '../../../miscs/update-results';
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
        <span className='text-sm font-medium'>Test:</span>
        <select
          className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background p-0.5 text-sm text-textSecondary shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {list.map((test) => (
            <option key={test} value={test}>
              {test}
            </option>
          ))}
        </select>
        <span className='flex flex-row place-content-center items-center'>
          <Link
            className='hover:bg-background/90 focus:ring-borderColor/30 flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 text-sm font-medium text-textSecondary shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
            target='_blank'
            href={GOOGLE_SHEET_URL || ''}
          >
            <span className='hidden p-0.5 md:inline'>
              <CheckCircle size={19} />
            </span>
            <span className='inline p-0.5 md:hidden'>
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
