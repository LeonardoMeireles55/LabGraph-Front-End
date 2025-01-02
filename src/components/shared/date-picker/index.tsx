import { DatePicker } from "@nextui-org/date-picker";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function DatePickerHelper({startDay, startMonth, startYear, endDay, endMonth, endYear,
    handleFullStartDate, handleFullEndDate }: {
        startDay: number;
        startMonth: number;
        startYear: number;
        endDay: number;
        endMonth: number;
        endYear: number;
        handleFullStartDate: (date: Date) => void;
        handleFullEndDate: (date: Date) => void;
    }) {


       



    return (
        <div className="w-full max-w-xl flex flex-row gap-4">
            <div className="w-full flex flex-col gap-1">
                <h3>De:</h3>
                <DatePicker

                     className="border border-borderColor rounded-md"
                    // classNames={{
                    //     base: ['text-textSecondary'],
                    //     calendarContent: ['text-textSecondary, bg-surface rounded-xl'],
                    // }}
                    aria-label="De:"
                    value={today(getLocalTimeZone()).set({
                        year: startYear,
                        month: startMonth,
                        day: startDay
                    })}
                    onChange={(val) => {
                        if (val) {
                            const jsDate = new Date(val.year, val.month, val.day);
                            handleFullStartDate(jsDate)
                        }
                    }}
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <h3>Até</h3>
                <DatePicker
                className="border border-borderColor rounded-md"
                    // classNames={{
                    //     base: ['text-textSecondary'],
                    //     calendarContent: ['text-textSecondary, bg-surface rounded-xl'],

                    // }}
                    aria-label="Até"
                    value={today(getLocalTimeZone()).set({
                        year: endYear,
                        month: endMonth,
                        day: endDay
                    })}
                    onChange={(val) => {
                        if (val) {
                            const jsDate = new Date(val.year, val.month, val.day);
                            handleFullEndDate(jsDate)

                        }
                    }}
                />
            </div>
        </div>
    );
}
