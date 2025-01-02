import { useState } from 'react';

export default function useDateSelector() {
  const endDate = new Date();
  const startDate = new Date();

  const [startDay, setStartDay] = useState<number>(startDate.getDate() - 1);
  const [startMonth, setStartMonth] = useState<number>(startDate.getMonth());
  const [startYear, setStartYear] = useState<number>(startDate.getFullYear());
  
  const [endDay, setEndDay] = useState<number>(endDate.getDate());
  const [endMonth, setEndMonth] = useState<number>(endDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(endDate.getFullYear());

  const handleFullStartDate = (date: Date): void => {
    setStartDay(date.getDate());
    setStartMonth(date.getMonth());
    setStartYear(date.getFullYear());
    console.log(date.getDate())
}

const handleFullEndDate = (date: Date): void => {
    setEndDay(date.getDate());
    setEndMonth(date.getMonth());
    setEndYear(date.getFullYear());
}


 
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
    handleFullStartDate,
    handleFullEndDate
  };
}