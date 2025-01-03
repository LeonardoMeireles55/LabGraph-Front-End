import useFetchListinig from '@/components/charts/single-line/hooks/useFetchListinig';
import { ListingItem } from '@/components/charts/types/Chart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from '../../../charts/mean-deviation';
import UpdateResults from '../../../features/update-results';
import urlAnalyticsByNameAndDateAndLevel from '../../../utils/helpers/urlAnalyticsByNameAndDateAndLevel';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import { CommonTestSelectorProps } from '../types/Selector';

const TestSelectorWithLevel: React.FC<CommonTestSelectorProps> = ({
  list,
  analyticsType,
  name,
  level,
  setListingItem: SetListingItem,
}) => {
  const [testName, setTestName] = useState<string>(name);
  const [testLevel, setTestLevel] = useState<number>(level || 1);

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

  const props = urlAnalyticsByNameAndDateAndLevel({
    analyticsType,
    name: testName,
    level: testLevel,
    date: { startDay, startMonth, startYear, endDay, endMonth, endYear },
  });

  const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListinig({
    url: props.url,
    urlMeanAndDeviation: props.urlMeanAndDeviation,
  });

  useEffect(() => {
    if (listing) {
      const updatedListing: ListingItem[] = listing.map((item) => ({
        ...item,
        ownMeanValue,
        ownSdValue,
      }));
      SetListingItem(updatedListing);
    }
  }, [listing, ownMeanValue, ownSdValue, unitValues, SetListingItem]);

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
        <span className='font-medium text-sm'>Teste:</span>
        <select
          className='rounded-md border border-borderColor bg-background px-3 py-1.5 text-sm text-textSecondary shadow-sm transition-all duration-200 hover:border-borderColor/80 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {list.map((test) => (
            <option key={test} value={test}>
              {test}
            </option>
          ))}
        </select>
        <span className='font-medium text-sm'>Nível:</span>
        <select
          className='rounded-md border border-borderColor bg-background px-3 py-1.5 text-sm text-textSecondary shadow-sm transition-all duration-200 hover:border-borderColor/80 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
          value={testLevel}
          onChange={(e) => setTestLevel(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        <span className='flex flex-row content-center items-center justify-between'>
          <Link
            className='inline-flex items-center justify-center rounded-md border border-borderColor bg-background px-3 py-1.5 text-sm font-medium text-textPrimary shadow-sm transition-all duration-200 hover:scale-105 hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
            target='_blank'
            href='https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit'
          >
            &#10003;
          </Link>
        </span>
        <div className='hidden w-full md:flex'>
          <UpdateResults analyticsType={analyticsType} />
          <MeanAndDeviationDisplay
            mean={listing[0]?.mean}
            sd={listing[0]?.sd}
            ownMean={ownMeanValue}
            ownSd={ownSdValue}
            unitValue={unitValues}
          />
        </div>
      </div>
    </div>
  );
};

export default TestSelectorWithLevel;
