import { ListingItem } from '@/components/charts/types/Chart';
import GenerateReports from '@/components/features/generate-reports';
import DateSelector from '@/components/shared/date-selector';
import {
  formatDateWithTime,
  formatEndDateWithTime,
} from '@/components/shared/date-selector/constants/formatDateWithTime';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import NavBar from '@/components/shared/navigation-bar';
import Footer from '@/components/shared/ui/footer';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ReportsPage = () => {
  const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');
  const {
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  } = useDateSelector();

  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS}startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatEndDateWithTime(endYear, endMonth, endDay)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await fetch('/api/get-token');
        const { token } = await tokenResponse.json();

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setDataFetched(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className='flex flex-col min-h-screen justify-evenly'>
      <Head>
        <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
      </Head>
      <NavBar jsonData={dataFetched} fileName={analyticsType} />
      <main className='flex flex-col items-center flex-grow mt-16 justify-evenly bg-background xl:mt-16'>
        <div className='grid gap-2 text-textSecondary md:flex xl:mt-14'>
          <DateSelector
            startDay={startDay}
            startMonth={startMonth}
            startYear={startYear}
            endDay={endDay}
            endMonth={endMonth}
            endYear={endYear}
            handleStartDayChange={handleStartDayChange}
            handleStartMonthChange={handleStartMonthChange}
            handleStartYearChange={handleStartYearChange}
            handleEndDayChange={handleEndDayChange}
            handleEndMonthChange={handleEndMonthChange}
            handleEndYearChange={handleEndYearChange}
          />
          <select
            className='text-xs border rounded-md border-borderColor bg-background text-textSecondary md:text-sm'
            value={analyticsType}
            onChange={(e) => setAnalyticsType(e.target.value)}
          >
            <option value={'biochemistry-analytics'}>BIOCHEMISTRY</option>
            <option value={'hematology-analytics'}>HEMATOLOGY</option>
            <option value={'coagulation-analytics'}>COAGULATION</option>
          </select>
          <span className='flex border rounded-md justify-evenly border-borderColor text-textSecondary'>
            <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
          </span>
        </div>
        <span className='w-4/6 p-4 border border-borderColor shadow-md rounded-xl md:mt-4 xl:w-1/3 xl:p-6'>
          <Image
            className='object-cover rounded-xl'
            fetchPriority='high'
            src='/reports.jpg'
            style={{
              width: '100%',
              height: 'auto',
              opacity: 1.0,
            }}
            width={350}
            height={150}
            alt='Laboratory image'
            priority={true}
          />
        </span>
        <div className='flex flex-col items-center content-end justify-end mt-16'>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
