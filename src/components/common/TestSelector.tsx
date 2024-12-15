import { useEffect, useState } from 'react';
import { TestSelectorProps } from '../types/chartInterfaces';
import MeanAndDeviationDisplay from '../chart/MeanAndDeviationDisplay';
import UpdateResults from '../features/UpdateResults';
import useFetchListing from '@/hooks/useFetchListing';
import Link from 'next/link';
import DateSelector from './DateSelector';
import generateUrlAnalyticsByNameAndDate from '../services/generateUrlAnalyticsByNameAndDate';



const TestSelector: React.FC<TestSelectorProps> = ({ list, analyticsType, name, level, setDataJson }) => {

  const [testName, setTestName] = useState<string>(name);
  const [testLevel, setTestLevel] = useState<number>(level || 1);

  const defaultDate = new Date();

  const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth() + 1);
  const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
  const [initialDay, setInitialDay] = useState<number>(1);
  const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate() + 1);
  const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
  const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());

  const analyticsProps = {
    analyticsType,
    name: testName,
    level: testLevel,
  }

  const dateProps = {
    initialDay,
    initialMonth,
    initialYear,
    secondDay,
    secondMonth,
    secondYear,
  };

  const props = generateUrlAnalyticsByNameAndDate({ ...analyticsProps, date: dateProps });

  const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListing({
    url: props.url,
    urlMeanAndDeviation: props.urlMeanAndDeviation,
  });

  useEffect(() => {
    setDataJson(listing);
  }, [listing, setDataJson]);

  return (
    <div className="grid md:flex gap-1 text-textSecondary mt-4">
      <DateSelector
        initialDay={initialDay}
        initialMonth={initialMonth}
        initialYear={initialYear}
        secondDay={secondDay}
        secondMonth={secondMonth}
        secondYear={secondYear}
        setInitialDay={setInitialDay}
        setInitialMonth={setInitialMonth}
        setInitialYear={setInitialYear}
        setSecondDay={setSecondDay}
        setSecondMonth={setSecondMonth}
        setSecondYear={setSecondYear}
      />
      <div className="flex flex-row justify-center items-center gap-1">
        <span className=" md:text-sm font-medium">Teste:</span>
        <select
          className="bg-background border border-borderColor text-textSecondary rounded p-0 md:text-sm"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {list.map((test) => (
            <option key={test} value={test}>{test}</option>
          ))}
        </select>
        <span className=" md:text-sm font-medium">Nível:</span>
        <select
          className="bg-background border border-borderColor text-textSecondary rounded p-0 md:px-2 md:py-1 md:text-sm"
          value={testLevel}
          onChange={(e) => setTestLevel(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        <span className='flex flex-row justify-center content-center items-center'>
          <Link
            className="bg-background border border-borderColor hover:scale-110 text-textPrimary rounded py-0 px-3 md:px-2 md:py-1 text-base"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit"
          >
            &#10003;
          </Link>
        </span>
      </div>

      <div className='hidden md:flex gap-0 w-full '>
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
  );
};
export default TestSelector;
