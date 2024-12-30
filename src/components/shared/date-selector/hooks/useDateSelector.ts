import { useState } from 'react';
import { addDays, subDays } from 'date-fns';

export default function useDateSelector() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate());

  const [startDay, setStartDay] = useState<number>(startDate.getDate() - 15);
  const [startMonth, setStartMonth] = useState<number>(startDate.getMonth() + 1);
  const [startYear, setStartYear] = useState<number>(startDate.getFullYear());
  
  const [endDay, setEndDay] = useState<number>(endDate.getDate());
  const [endMonth, setEndMonth] = useState<number>(endDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(endDate.getFullYear());

  const updateEndDateFrom = (startDate: Date) => {
    const newEndDate = addDays(startDate, 15);
    setEndDay(newEndDate.getDate());
    setEndMonth(newEndDate.getMonth() + 1);
    setEndYear(newEndDate.getFullYear());
  };

  const updateStartDateFrom = (endDate: Date) => {
    const newStartDate = subDays(endDate, 15);
    setStartDay(newStartDate.getDate());
    setStartMonth(newStartDate.getMonth() + 1);
    setStartYear(newStartDate.getFullYear());
  };

  const handleStartDayChange = (day: number) => {
    const newStartDate = new Date(startYear, startMonth - 1, day);
    setStartDay(day);
    updateEndDateFrom(newStartDate);
  };

  const handleEndDayChange = (day: number) => {
    const newEndDate = new Date(endYear, endMonth - 1, day);
    setEndDay(day);
    updateStartDateFrom(newEndDate);
  };

  const handleStartMonthChange = (month: number) => {
    const zeroBased = Math.max(0, Math.min(11, month - 1));
    const newStartDate = new Date(startYear, zeroBased, startDay);
    setStartMonth(month);
    updateEndDateFrom(newStartDate);
  };

  const handleEndMonthChange = (month: number) => {
    const zeroBased = Math.max(0, Math.min(11, month - 1));
    const newEndDate = new Date(endYear, zeroBased, endDay);
    setEndMonth(month);
    updateStartDateFrom(newEndDate);
  };

  const handleStartYearChange = (year: number) => {
    const newStartDate = new Date(year, startMonth - 1, startDay);
    setStartYear(year);
    updateEndDateFrom(newStartDate);
  };

  const handleEndYearChange = (year: number) => {
    const newEndDate = new Date(year, endMonth - 1, endDay);
    setEndYear(year);
    updateStartDateFrom(newEndDate);
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