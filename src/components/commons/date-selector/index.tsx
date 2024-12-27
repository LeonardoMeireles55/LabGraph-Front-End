import React from 'react';
import MonthSelector from './components/MonthSelector';
import DaySelector from './components/DaySelector';


interface DateSelectorProps {
    initialDay: number;
    initialMonth: number;
    initialYear: number;
    secondDay: number;
    secondMonth: number;
    secondYear: number;
    setInitialDay: (day: number) => void;
    setInitialMonth: (month: number) => void;
    setInitialYear: (year: number) => void;
    setSecondDay: (day: number) => void;
    setSecondMonth: (month: number) => void;
    setSecondYear: (year: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
    initialDay,
    initialMonth,
    initialYear,
    secondDay,
    secondMonth,
    secondYear,
    setInitialDay,
    setInitialMonth,
    setInitialYear,
    setSecondDay,
    setSecondMonth,
    setSecondYear,
}) => {
    return (
        <div className="space-y-1 md:space-y-2">
            <div className="flex items-center gap-2 text-textSecondary">
                <span className="mr-1 font-medium md:text-sm">De:</span>
                <DaySelector selectedDay={initialDay} onDayChange={setInitialDay} />
                <MonthSelector selectedMonth={initialMonth} onMonthChange={setInitialMonth} />
                <div className="flex items-center">
                    <label
                        htmlFor="initialYear"
                        className="sr-only"
                    >
                        Ano inicial
                    </label>
                    <select
                        id="initialYear"
                        className="rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
                        value={initialYear}
                        onChange={(e) => setInitialYear(+e.target.value)}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-2 text-textSecondary">
                <span className="font-medium md:text-sm">Até:</span>
                <DaySelector selectedDay={secondDay} onDayChange={setSecondDay} />
                <MonthSelector selectedMonth={secondMonth} onMonthChange={setSecondMonth} />
                <div className="flex items-center">
                    <label
                        htmlFor="secondYear"
                        className="sr-only"
                    >
                        Ano final
                    </label>
                    <select
                        id="secondYear"
                        className="rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
                        value={secondYear}
                        onChange={(e) => setSecondYear(+e.target.value)}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DateSelector;
