export default interface DateSelectorProps {
    startDay: number;
    startMonth: number;
    startYear: number;
    endDay: number;
    endMonth: number;
    endYear: number;
    handleStartDayChange: (day: number) => void;
    handleStartMonthChange: (month: number) => void;
    handleStartYearChange: (year: number) => void;
    handleEndDayChange: (day: number) => void;
    handleEndMonthChange: (month: number) => void;
    handleEndYearChange: (year: number) => void;
  }