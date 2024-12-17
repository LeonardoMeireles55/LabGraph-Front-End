import DateSelector from '@/components/common/DateSelector';
import ListingTable from '@/components/features/ListingTable';
import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/layouts/NavBar';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

const AnalyticsTable = () => {
    const defaultDate = new Date();

    const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth());
    const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [initialDay, setInitialDay] = useState<number>(1);
    const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate() + 1);
    const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
    const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());
    const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');

    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const formatToTwoDigits = (value: number) => String(value).padStart(2, '0');

    const formatDateWithTime = (year: number, month: number, day: number) => {
        const formattedDate = `${year}-${formatToTwoDigits(month)}-${formatToTwoDigits(day + 1)}`;
        return `${formattedDate} 00:00:00`;
    };

    const baseUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/names/date-range?startDate=${formatDateWithTime(initialYear, initialMonth, initialDay)}&endDate=${formatDateWithTime(secondYear, secondMonth, secondDay)}`;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(baseUrl);
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
    }, [baseUrl]);

    const analyticsOptions = [
        { value: 'biochemistry-analytics', label: 'BIOQUÍMICA' },
        { value: 'hematology-analytics', label: 'HEMATOLOGIA' },
        { value: 'coagulation-analytics', label: 'COAGULAÇÃO' },
    ];

    return (
        <div className="mt-8 flex min-h-screen flex-col bg-background">
            <Head>
                <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={analyticsType} />

            <main className="flex flex-grow flex-col items-center justify-center px-4 py-8 md:px-8">
                <div className="w-full max-w-6xl space-y-4">
                    <div className="rounded-lg bg-background p-4 md:p-6">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                            <div className="mt-8 w-full md:mt-8 md:w-auto">
                                <DateSelector
                                    initialDay={initialDay}
                                    initialMonth={initialMonth}
                                    initialYear={initialYear}
                                    secondDay={secondDay}
                                    secondMonth={secondMonth}
                                    secondYear={secondYear}
                                    setInitialDay={setInitialDay}
                                    setInitialMonth={setInitialMonth}
                                    setInitialYear={setInitialYear}
                                    setSecondDay={setSecondDay}
                                    setSecondMonth={setSecondMonth}
                                    setSecondYear={setSecondYear}
                                />
                            </div>

                            <div className="relative w-full md:w-auto">
                                <div className="relative">
                                    <select
                                        className="border-textSecondary/25 w-full appearance-none rounded-md border bg-background py-2 pl-3 pr-10 text-sm text-textSecondary focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={analyticsType}
                                        onChange={(e) => setAnalyticsType(e.target.value)}
                                    >
                                        {analyticsOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-textSecondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="relative rounded bg-danger px-4 py-3 text-white" role="alert">
                            {error}
                        </div>
                    ) : (
                        <ListingTable items={dataFetched} />
                    )}
                </div>
            </main>
            <div className="mt-auto flex items-center justify-center">
                <Footer />
            </div>
        </div>
    );
};

export default AnalyticsTable;
