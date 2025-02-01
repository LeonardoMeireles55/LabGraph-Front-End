import { useState } from 'react';

export default function useDateSelector() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 15); // Inicializa a data inicial com 15 dias antes da data final

  const [startDay, setStartDay] = useState<number>(startDate.getDate());
  const [startMonth, setStartMonth] = useState<number>(startDate.getMonth() + 1);
  const [startYear, setStartYear] = useState<number>(startDate.getFullYear());

  const [endDay, setEndDay] = useState<number>(endDate.getDate());
  const [endMonth, setEndMonth] = useState<number>(endDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(endDate.getFullYear());

  function ensure15Days(date: Date, isStart: boolean) {
    const result = new Date(date);
    result.setDate(result.getDate() + (isStart ? 15 : -15));
    return result;
  }

  const handleStartDayChange = (day: number) => {
    const newStart = new Date(startYear, startMonth - 1, day);
    const newEnd = ensure15Days(newStart, true);

    setStartDay(day);
    setEndDay(newEnd.getDate());
    setEndMonth(newEnd.getMonth() + 1);
    setEndYear(newEnd.getFullYear());
  };

  const handleEndDayChange = (day: number) => {
    const newEnd = new Date(endYear, endMonth - 1, day);
    const newStart = ensure15Days(newEnd, false);

    setEndDay(day);
    setStartDay(newStart.getDate());
    setStartMonth(newStart.getMonth() + 1);
    setStartYear(newStart.getFullYear());
  };

  const handleStartMonthChange = (month: number) => {
    const newStart = new Date(startYear, month - 1, startDay);
    const newEnd = ensure15Days(newStart, true);

    setStartMonth(month);
    setEndDay(newEnd.getDate());
    setEndMonth(newEnd.getMonth() + 1);
    setEndYear(newEnd.getFullYear());
  };

  const handleEndMonthChange = (month: number) => {
    const newEnd = new Date(endYear, month - 1, endDay);
    const newStart = ensure15Days(newEnd, false);

    setEndMonth(month);
    setStartDay(newStart.getDate());
    setStartMonth(newStart.getMonth() + 1);
    setStartYear(newStart.getFullYear());
  };

  const handleStartYearChange = (year: number) => {
    const newStart = new Date(year, startMonth - 1, startDay);
    const newEnd = ensure15Days(newStart, true);

    setStartYear(year);
    setEndDay(newEnd.getDate());
    setEndMonth(newEnd.getMonth() + 1);
    setEndYear(newEnd.getFullYear());
  };

  const handleEndYearChange = (year: number) => {
    const newEnd = new Date(year, endMonth - 1, endDay);
    const newStart = ensure15Days(newEnd, false);

    setEndYear(year);
    setStartDay(newStart.getDate());
    setStartMonth(newStart.getMonth() + 1);
    setStartYear(newStart.getFullYear());
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
