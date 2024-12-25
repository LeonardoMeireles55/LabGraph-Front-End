import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import UpdateResults from '../features/UpdateResults';
import generateUrlByNameAndDate from '../services/generateUrlByNameAndDate';
import { TestSelectorProps2 } from '../../types/chartInterfaces';
import DateSelector from './DateSelector';
import useFetchDoubleListinig from '@/hooks/useFetchDoubleListinig';
import MeanAndDeviationDisplay from '../chart/MeanAndDeviationDisplay';

const TestSelector2: React.FC<TestSelectorProps2> = ({ list, analyticsType, name, setListinig }) => {
    const [testName, setTestName] = useState<string>(name);
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
    };

    const dateProps = {
        initialDay,
        initialMonth,
        initialYear,
        secondDay,
        secondMonth,
        secondYear,
    };

    const props = generateUrlByNameAndDate({
        ...analyticsProps,
        date: dateProps,
    });

    const {
        listing,
        listing2,
        unitValues,
        unitValues2,
        ownMeanValue,
        ownSdValue,
        ownMeanValue2,
        ownSdValue2,
    } = useFetchDoubleListinig({
        url: props.url,
        urlMeanAndDeviation: props.urlMeanAndDeviation,
        url2: props.url2,
        urlMeanAndDeviation2: props.urlMeanAndDeviation2,
    });

    useEffect(() => {
        if (listing && listing2) {
            const updatedData = {
                level1: listing.map(item => ({
                    ...item,
                    ownMeanValue,
                    ownSdValue,
                })),
                level2: listing2.map(item => ({
                    ...item,
                    ownMeanValue: ownMeanValue2,
                    ownSdValue: ownSdValue2,
                }))
            };
            setListinig(updatedData);
        }
    }, [listing, listing2, ownMeanValue, ownSdValue, ownMeanValue2, ownSdValue2]);


    return (
        <div className="mt-12 xl:w-full md:mt-4 lg:mt-4 grid gap-1  text-textSecondary xl:flex xl:justify-around items-center content-center">
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
            <div className="flex flex-row items-center content-center justify-between gap-1">
                <span className="font-medium md:text-sm">Teste:</span>
                <select
                    className="rounded border border-borderColor bg-background p-0 xl:p-1 text-textSecondary md:text-sm"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                >
                    {list.map((test) => (
                        <option key={test} value={test}>
                            {test}
                        </option>
                    ))}
                </select>
                <span className="font-medium md:text-sm ">Nível:</span>
                <select
                    className="rounded cursor-not-allowed border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
                    value={'1'}
                    onChange={(e) => (Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <span className="flex flex-row content-center items-center justify-between">
                    <Link
                        className="rounded border border-borderColor bg-background content-center items-center py-0 px-1 text-base text-textPrimary hover:scale-110 md:px-2 md:py-1"
                        target="_blank"
                        href="https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit"
                    >
                        &#10003;
                    </Link>
                </span>
                <div className="hidden w-full md:flex">
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

export default React.memo(TestSelector2);
