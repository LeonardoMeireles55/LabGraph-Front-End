export interface DateSelectorProps {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  handleFullStartDate: (date: Date) => void;
  handleFullEndDate: (date: Date) => void;
}

export interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}


export interface MonthSelectorProps {
    selectedMonth: number;
    onMonthChange: (month: number) => void;
}


export interface SingleDateSelectorProps {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  handleFullStartDate: (date: Date) => void;
  handleFullEndDate: (date: Date) => void;
}

export interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}
