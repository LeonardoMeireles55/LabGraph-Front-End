import GenerateReports from '@/components/features/generate-reports';
import Footer from '@/components/ui/footer';
import NavBar from '@/components/ui/navigation-bar';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ListingItem } from '@/components/charts/types/Chart';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import DateSelector from '@/components/shared/date-selector';
import { formatDateWithTime, formatEndDateWithTime } from '@/components/shared/date-selector/constants/formatDateWithTime';


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
            handleEndYearChange
        } = useDateSelector();

    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);
    const url = 
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS}startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatEndDateWithTime(endYear, endMonth, endDay)}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await fetch('/api/get-token');
                const { token } = await tokenResponse.json();

                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const result = await response.json();
                setDataFetched(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [url]);

    return (
        <div className="flex min-h-screen flex-col justify-evenly">
            <Head>
                <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={analyticsType} />
            <main className="flex flex-grow flex-col items-center justify-evenly bg-background mt-16 xl:mt-16">
                <div className="xl:mt-14 grid gap-2 text-textSecondary md:flex">
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
                        className="rounded-md border border-borderColor bg-background text-xs text-textSecondary md:text-sm"
                        value={analyticsType}
                        onChange={(e) => setAnalyticsType(e.target.value)}
                    >
                        <option value={'biochemistry-analytics'}>BIOQUÍMICA</option>
                        <option value={'hematology-analytics'}>HEMATOLOGIA</option>
                        <option value={'coagulation-analytics'}>COAGULAÇÃO</option>
                    </select>
                    <span className="flex justify-evenly rounded-md border border-borderColor text-textSecondary">
                        <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
                    </span>
                </div>
                <span className="xl:w-1/3 w-5/6 rounded-xl border border-textPrimary p-4 shadow-md md:mt-4 xl:p-8">
                    <Image
                        className="rounded-xl object-cover"
                        fetchPriority="high"
                        src="/lab.jpg"
                        style={{
                            width: '100%',
                            height: 'auto',
                          }}
                          width={350}
                          height={150}
                        alt="Imagem do laboratório"
                        priority={true}
                    />
                </span>
                <div className="flex mt-16 flex-col justify-end items-center content-end">
                    <Footer />
                </div>
            </main>

        </div>
    );
};

export default ReportsPage;
