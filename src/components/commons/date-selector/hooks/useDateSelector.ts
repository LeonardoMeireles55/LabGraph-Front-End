import { useState } from 'react';

export default function useDateSelector() {
  const defaultDate = new Date();
  
  const [startDay, setStartDay] = useState<number>(15);
  const [startMonth, setStartMonth] = useState<number>(defaultDate.getMonth());
  const [startYear, setStartYear] = useState<number>(defaultDate.getFullYear());
  
  const [endDay, setEndDay] = useState<number>(defaultDate.getDate()  + 1);
  const [endMonth, setEndMonth] = useState<number>(defaultDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(defaultDate.getFullYear());

  // Date Update Handlers
  const handleStartDayChange = (day: number) => setStartDay(day);
  const handleStartMonthChange = (month: number) => setStartMonth(month);
  const handleStartYearChange = (year: number) => setStartYear(year);
  
  const handleEndDayChange = (day: number) => setEndDay(day);
  const handleEndMonthChange = (month: number) => setEndMonth(month);
  const handleEndYearChange = (year: number) => setEndYear(year);


  return {
    // Start Date
    startDay,
    startMonth,
    startYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    
    // End Date
    endDay,
    endMonth,
    endYear,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  };
}