import useFetchListing from '@/components/charts/single-line/hooks/useFetchListinig';
import { ListingItem } from '@/components/charts/types/Chart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from '../../../charts/mean-deviation';
import UpdateResults from '../../../features/update-results';
import urlAnalyticsByNameAndDateAndLevel from '../../../utils/helpers/urlAnalyticsByNameAndDateAndLevel';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import { CommonTestSelectorProps } from '../types/Selector';
import { CheckCircle } from 'lucide-react';

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

  const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListing({
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
      console.log('updatedListing...');
    }
  }, [listing, ownMeanValue, ownSdValue, unitValues, SetListingItem]);

  return (
    <div className='mt-12 grid content-start items-start gap-1 text-textSecondary md:mt-4 lg:mt-4 xl:flex xl:w-full xl:justify-around'>
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
      <div className='mt-2 md:mt-0 grid grid-cols-1 content-start items-start justify-start gap-2 md:flex-row'>
        <div className='flex flex-row items-center gap-2'>
          <span className='font-medium text-sm'>Test:</span>
          <select
            className='rounded-md border border-borderColor bg-background md:px-2 md:py-1 text-sm text-textSecondary shadow-sm transition-all duration-200 hover:border-borderColor/80 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          >
            {list.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>
          <span className='font-medium text-sm'>Level:</span>
          <select
            className='rounded-md border border-borderColor bg-background py-0.5 md:px-1 md:py-1 text-sm text-textSecondary shadow-sm transition-all duration-200 hover:border-borderColor/80 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
            value={testLevel}
            onChange={(e) => setTestLevel(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <span className='flex flex-row content-center items-center justify-center'>
            <Link
              className='flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 md:px-2 md:py-1 text-sm font-medium text-textSecondary shadow-sm transition-all duration-200 hover:scale-110 hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-borderColor/30'
              target='_blank'
              href='https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit'
            >
              <span className='hidden md:inline px-0.5 py-0.5'>
                <CheckCircle size={17} />
              </span>
              <span className='inline md:hidden px-0.5 py-0.5'>
                <CheckCircle size={17} />
              </span>
            </Link>
          </span>
          <UpdateResults analyticsType={analyticsType} />
        </div>
        <MeanAndDeviationDisplay
          mean={listing[0]?.mean}
          sd={listing[0]?.sd}
          ownMean={ownMeanValue}
          ownSd={ownSdValue}
          unitValue={unitValues}
        />
      </div>
    </div>
  );
};

export default TestSelectorWithLevel;
