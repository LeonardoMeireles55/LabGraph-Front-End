import { useState } from 'react';

export default function useDateSelector() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  const [startDay, setStartDay] = useState<number>(startDate.getDate() + 9);
  const [startMonth, setStartMonth] = useState<number>(startDate.getMonth() - 1);
  const [startYear, setStartYear] = useState<number>(startDate.getFullYear());

  const [endDay, setEndDay] = useState<number>(endDate.getDate());
  const [endMonth, setEndMonth] = useState<number>(endDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(endDate.getFullYear());

  const handleStartDayChange = (day: number) => {
    setStartDay(day);
  };

  const handleEndDayChange = (day: number) => {
    setEndDay(day);
  };

  const handleStartMonthChange = (month: number) => {
    setStartMonth(month);
  };

  const handleEndMonthChange = (month: number) => {
    setEndMonth(month);
  };

  const handleStartYearChange = (year: number) => {
    setStartYear(year);
  };

  const handleEndYearChange = (year: number) => {
    setEndYear(year);
  };

  return {
    startDay,
    startMonth,
    startYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    endDay,
    endMonth,
    endYear,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  };
}
