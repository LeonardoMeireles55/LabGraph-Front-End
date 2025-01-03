import useFetchListiningGrouped from '@/components/charts/multiple-line/hooks/useFetchListiningGrouped';
import urlByNameAndDateNew from '@/components/utils/helpers/urlByNameAndDateNew';
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

  const { listing } = useFetchListiningGrouped(url);

  useEffect(() => {
    setListinig(listing);
  }, [url, listing, setListinig]);

  return (
    <div className='mt-12 grid content-center items-center gap-1 text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
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
      <div className='flex flex-row content-center items-center justify-between gap-1'>
        <span className='font-medium md:text-sm'>Teste:</span>
        <select
          className='rounded border border-borderColor bg-background p-0 text-textSecondary md:text-sm xl:p-1'
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {list.map((test) => (
            <option key={test} value={test}>
              {test}
            </option>
          ))}
        </select>
        <span className='flex flex-row content-center items-center justify-between'>
          <Link
            className='content-center items-center rounded border border-borderColor bg-background px-1 py-0 text-base text-textPrimary hover:scale-110 md:px-2 md:py-1'
            target='_blank'
            href='https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit'
          >
            &#10003;
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
