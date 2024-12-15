import useFetchListing from '@/hooks/useFetchListing';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from '../chart/MeanAndDeviationDisplay';
import UpdateResults from '../features/UpdateResults';
import generateUrlAnalyticsByNameAndDate from '../services/generateUrlAnalyticsByNameAndDate';
import { TestSelectorProps } from '../types/chartInterfaces';
import DateSelector from './DateSelector';

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
    };

    const dateProps = {
        initialDay,
        initialMonth,
        initialYear,
        secondDay,
        secondMonth,
        secondYear,
    };

    const props = generateUrlAnalyticsByNameAndDate({
        ...analyticsProps,
        date: dateProps,
    });

    const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListing({
        url: props.url,
        urlMeanAndDeviation: props.urlMeanAndDeviation,
    });

    useEffect(() => {
        setDataJson(listing);
    }, [listing, setDataJson]);

    return (
        <div className="mt-4 grid gap-1 text-textSecondary md:flex">
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
            <div className="flex flex-row items-center justify-center gap-1">
                <span className="font-medium md:text-sm">Teste:</span>
                <select
                    className="rounded border border-borderColor bg-background p-0 text-textSecondary md:text-sm"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                >
                    {list.map((test) => (
                        <option key={test} value={test}>
                            {test}
                        </option>
                    ))}
                </select>
                <span className="font-medium md:text-sm">Nível:</span>
                <select
                    className="rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
                    value={testLevel}
                    onChange={(e) => setTestLevel(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <span className="flex flex-row content-center items-center justify-center">
                    <Link
                        className="rounded border border-borderColor bg-background px-3 py-0 text-base text-textPrimary hover:scale-110 md:px-2 md:py-1"
                        target="_blank"
                        href="https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit"
                    >
                        &#10003;
                    </Link>
                </span>
            </div>

            <div className="hidden w-full gap-0 md:flex">
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
