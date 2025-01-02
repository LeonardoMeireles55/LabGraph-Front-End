import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate } from "@internationalized/date";

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
        <div className="w-full max-w-xl flex flex-row gap-4 text-sm md:text-md">
            <div className="w-full flex flex-col gap-0">
                <DatePicker

                     className="border border-borderColor rounded-md"
                    // classNames={{
                    //     base: ['text-textSecondary'],
                    //     calendarContent: ['text-textSecondary, bg-surface rounded-xl'],
                    // }}
                    aria-label="De:"
                    value={new CalendarDate(startYear, startMonth + 1, (startDay))}
                    onChange={(val) => {
                        if (val) {
                            const jsDate = new Date(val.year, val.month - 1, val.day);
                            handleFullStartDate(jsDate)
                        }
                    }}
                />
            </div>
            <div className="w-full flex flex-col gap-0">
                <DatePicker
                className="border border-borderColor rounded-md"
                    // classNames={{
                    //     base: ['text-textSecondary'],
                    //     calendarContent: ['text-textSecondary, bg-surface rounded-xl'],

                    // }}
                    aria-label="Até"
                    value={new CalendarDate(endYear, endMonth + 1, endDay)}
                    onChange={(val) => {
                        if (val) {
                            const jsDate = new Date(val.year, val.month - 1, val.day);
                            handleFullEndDate(jsDate)

                        }
                    }}
                />
            </div>
        </div>
    );
}
