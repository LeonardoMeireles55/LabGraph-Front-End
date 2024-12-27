import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UpdateResults from '../features/UpdateResults';
import generateUrlByNameAndDate from '../services/generateUrlByNameAndDate';
import { TestSelectorProps2, ListingsData } from '../../types/chartInterfaces';
import DateSelector from './DateSelector';
import useFetchListinigs from '@/hooks/useFetchListinigs';
import MeanAndDeviationDisplay from '../chart/MeanAndDeviationDisplay';

const TestSelectorWithoutLevel: React.FC<TestSelectorProps2> = ({ levelListSize, list, analyticsType, name, setListinig }) => {
    const [testName, setTestName] = useState<string>(name);
    const defaultDate = new Date();

    const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [initialDay, setInitialDay] = useState<number>(1);
    const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate() + 1);
    const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
    const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());
    const [selectedLevel, setSelectedLevel] = useState<number>(1);

    const analyticsProps = {
        analyticsType,
        name: testName,
        levelsSize: levelListSize,
    };

    const dateProps = {
        initialDay,
        initialMonth,
        initialYear,
        secondDay,
        secondMonth,
        secondYear,
    };

    const { urls, meanDeviationUrls } = generateUrlByNameAndDate({
        ...analyticsProps,
        date: dateProps,
        levelSize: levelListSize,
    });

    const {
        listings,
        unitValuesList,
        ownMeanValues,
        ownSdValues,
    } = useFetchListinigs({
        urls,
        meanDeviationUrls,
    });

    useEffect(() => {
        if (listings && listings.length >= 1) {
            const updatedData: ListingsData = {
                level1: [],
                level2: [],
                level3: [],
            };
            
            listings.forEach((listing, index) => {
                if (listing && listing.length > 0) {
                    const level = `level${index + 1}` as keyof ListingsData;
                    updatedData[level] = listing.map(item => ({
                        ...item,
                        ownMeanValue: ownMeanValues[index],
                        ownSdValue: ownSdValues[index],
                    }));
                }
            });

            setListinig(updatedData);
        }
    }, [listings, ownMeanValues, ownSdValues, unitValuesList, setListinig]);

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
                {/* <span className="font-medium md:text-sm ">Nível:</span> */}
                {/* <select
                    className="rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                >
                    {listings.map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select> */}
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
                {/* <MeanAndDeviationDisplay
                    mean={listings[selectedLevel - 1]?.[0]?.mean}
                    sd={listings[selectedLevel - 1]?.[0]?.sd}
                    ownMean={ownMeanValues[selectedLevel - 1]}
                    ownSd={ownSdValues[selectedLevel - 1]}
                    unitValue={unitValuesList[selectedLevel - 1]}
                /> */}
            </div>
            </div>
        </div>
    );
};

export default React.memo(TestSelectorWithoutLevel);
