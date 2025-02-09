import useFetchListing from '@/features/charts/single-line/hooks/useFetchListinig';
import { ListingItem } from '@/features/charts/types/Chart';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from '../../../charts/mean-deviation';
import UpdateResults from '../../../features/update-results';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import urlAnalyticsByNameAndDateAndLevel from '../../utils/helpers/urlAnalyticsByNameAndDateAndLevel';
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
    }
  }, [listing, ownMeanValue, ownSdValue, unitValues, SetListingItem]);

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK;

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
      <div className='mt-2 grid grid-cols-1 place-content-start items-start gap-2 md:mt-0 md:flex-row'>
        <div className='flex flex-row items-center gap-2'>
          <span className='text-sm font-medium'>Test:</span>
          <select
            className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md border border-borderColor bg-background text-sm text-textSecondary shadow-sm shadow-shadow transition-all duration-200 focus:outline-none focus:ring-2 md:px-2 md:py-1'
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          >
            {list.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>
          <span className='text-sm font-medium'>Level:</span>
          <select
            className='hover:border-borderColor/80 focus:ring-borderColor/30 rounded-md  border border-borderColor bg-background py-0.5 text-sm text-textSecondary shadow-sm shadow-shadow  transition-all duration-200 focus:outline-none focus:ring-2 md:p-1'
            value={testLevel}
            onChange={(e) => setTestLevel(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <span className='flex flex-row place-content-center items-center'>
            <Link
              className='hover:bg-background/90 focus:ring-borderColor/30 flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 text-sm font-medium text-textSecondary shadow-sm shadow-shadow transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
              target='_blank'
              href={GOOGLE_SHEET_URL ?? ''}
            >
              <span className='hidden p-0.5 md:inline'>
                <CheckCircle size={17} />
              </span>
              <span className='inline p-0.5 md:hidden'>
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
