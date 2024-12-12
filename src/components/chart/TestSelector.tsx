import { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from './MeanAndDeviationDisplay';
import UpdateResults from './UpdateResults';
import DateSelector from '../functional/DateSelector';
import useFetchListing from '@/hooks/useFetchListing';
import Link from 'next/link';
import formatDateWithTime from '../functional/formatDateWithTime';

interface TestSelectorProps {
  list: string[];
  analyticsType: string;
  name: string;
  level: number;
  setDataJson: (data: any) => void;
}

const testFormatFix = (testName: string) => {
  if (testName.includes('#')) {
    return testName = testName.replace('#', '%23');
  }
  if (testName.includes('%')) {
    return testName = testName.replace('%', '%25');
  }

  return testName;

}


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

  const baseUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/search/date-range?name=`;
  const meanAndDeviationUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/mean-standard-deviation?name=`;
  const url = `${baseUrl}${testFormatFix(testName)}&level=${testLevel}&startDate=${formatDateWithTime(initialYear, initialMonth, initialDay)}&endDate=${formatDateWithTime(secondYear, secondMonth, secondDay)}`;
  const urlMeanAndDeviation = `${meanAndDeviationUrl}${testFormatFix(testName)}&level=${testLevel}&startDate=${formatDateWithTime(initialYear, initialMonth, initialDay)}&endDate=${formatDateWithTime(secondYear, secondMonth, secondDay)}`;

  const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListing({
    url: url,
    urlMeanAndDeviation: urlMeanAndDeviation,
  });

  useEffect(() => {
    setDataJson(listing);
  }, [listing]);

  return (
    <div className=''>
      <div className="grid md:flex gap-2 mt-4 md:mt-2 text-textSecondary">
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
        <div className="flex justify-start items-center gap-1">
          <span className="text-xs md:text-sm font-medium">Teste:</span>
          <select
            className="bg-background border border-borderColor text-textSecondary rounded p-0 md:px-2 md:py-1 text-xs md:text-sm"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          >
            {list.map((test) => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
          <span className="text-xs md:text-sm font-medium">Nível:</span>
          <select
            className="bg-background border border-borderColor text-textSecondary rounded p-0 text-xs md:px-2 md:py-1 md:text-sm"
            value={testLevel}
            onChange={(e) => setTestLevel(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <Link
            className="bg-background border border-borderColor hover:scale-110 text-textSecondary rounded py-0 px-1 md:px-2 md:py-1 text-xs md:text-sm"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit"
          >
            &#10003;
          </Link>
        </div>

        <div className='hidden md:flex gap-0 w-full text-xs'>
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
export default TestSelector;
