import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UpdateResults from '../../../features/update-results';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import { TestSelectorProps } from '../types/Selector';
import urlByNameAndDateNew from '@/components/utils/helpers/urlByNameAndDateNew';
import useFetchListiningGrouped from '@/components/charts/multiple-line/hooks/useFetchListiningGrouped';

const TestSelectorWithoutLevel: React.FC<TestSelectorProps> = ({ list, analyticsType ,name, setListinig }) => {
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
        handleEndYearChange
    } = useDateSelector();

    
    const { url } = urlByNameAndDateNew({
        name: testName,
        date: { startDay, startMonth, startYear, endDay, endMonth, endYear },
        analyticsType,
    });



    const {
        listing,
    } = useFetchListiningGrouped(url);

    useEffect(() => {
        setListinig(listing);
    }, [url, listing, setListinig]);

    

    return (
        <div className="mt-12 xl:w-full md:mt-4 lg:mt-4 grid gap-1  text-textSecondary xl:flex xl:justify-around items-center content-center">
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
                </div>
            </div>
        </div>
    );
};

export default React.memo(TestSelectorWithoutLevel);
