import DateSelector from '@/components/common/DateSelector';
import GenerateReports from '@/components/features/GenerateReports';
import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/layouts/NavBar';
import formatDateWithTime from '@/components/utils/formatDateWithTime';
import Head from 'next/head';
import Image from 'next/image';
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

const Reports = () => {
    const defaultDate = new Date();

    const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth());
    const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [initialDay, setInitialDay] = useState<number>(1);
    const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate() + 1);
    const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
    const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());
    const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');

    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/names/date-range?startDate=${formatDateWithTime(initialYear, initialMonth, initialDay)}&endDate=${formatDateWithTime(secondYear, secondMonth, secondDay)}`;

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

export default Reports;
