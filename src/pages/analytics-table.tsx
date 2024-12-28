import DateSelector from '@/components/shared/date-selector';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import ListingTable from '@/components/features/listing-table';
import Footer from '@/components/ui/footer';
import NavBar from '@/components/ui/navigation-bar';
import { ListingItem } from '@/components/charts/types/Chart';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const AnalyticsTable = () => {
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

    const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');

    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const formatToTwoDigits = (value: number) => String(value).padStart(2, '0');

    const formatDateWithTime = (year: number, month: number, day: number) => {
        const formattedDate = `${year}-${formatToTwoDigits(month)}-${formatToTwoDigits(day + 1)}`;
        return `${formattedDate} 00:00:00`;
    };

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/names/date-range?startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatDateWithTime(endYear, endMonth, endDay)}`;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
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

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setDataFetched(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Não foi possível carregar os dados. Por favor, tente novamente.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const analyticsOptions = [
        { value: 'biochemistry-analytics', label: 'BIOQUÍMICA' },
        { value: 'hematology-analytics', label: 'HEMATOLOGIA' },
        { value: 'coagulation-analytics', label: 'COAGULAÇÃO' },
    ];

    return (
        <div className="min-h-min bg-background">

            <div className="xl:mt-12 mt-2 flex min-h-screen flex-col justify-evenly content-center items-center">
                <Head>
                    <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
                </Head>
                <NavBar jsonData={dataFetched} fileName={analyticsType} />
                <div className="w-full max-w-7xl">
                    <div className="rounded-lg ">
                        <div className="md:flex grid grid-cols-2  items-center justify-start content-center  mb-1">
                            <div className="w-full md:w-auto mt-8 md:mt-0">
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

                                <div className="flex flex-row gap-1 py-1 w-full">
                                    <label
                                        htmlFor="tests"
                                        className="text-textSecondary"
                                    >
                                        Teste:
                                    </label>
                                    <select
                                        id="tests"
                                        className="rounded border border-borderColor bg-background text-textSecondary md:px-2 md:py-1 md:text-sm"
                                        value={analyticsType}
                                        onChange={(e) => setAnalyticsType(e.target.value)}
                                    >
                                        {analyticsOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-evenly items-center content-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="mtrelative rounded bg-danger px-4 py-3 text-white" role="alert">
                            {error}
                        </div>
                    ) : (
                        <ListingTable items={dataFetched} />
                    )}
                </div>
                <div className="flex flex-col justify-end items-center">
                    <Footer />
                </div>
            </div>

        </div>
    );
};

export default AnalyticsTable;
