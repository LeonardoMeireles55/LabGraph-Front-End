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
    const baseUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/names/date-range?startDate=${formatDateWithTime(initialYear, initialMonth, initialDay)}&endDate=${formatDateWithTime(secondYear, secondMonth, secondDay)}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);
                const result = await response.json();
                setDataFetched(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    return (
        <div className="flex min-h-screen flex-col">
            <Head>
                <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={analyticsType} />
            <main className="mt-12 flex flex-grow flex-col items-center justify-center bg-background p-4 md:mt-8 md:p-8">
                <div className="mt-14 grid gap-2 text-textSecondary md:flex">
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
                        className="rounded-md border border-borderColor bg-background p-0 text-xs text-textSecondary md:px-2 md:py-1 md:text-sm"
                        value={analyticsType}
                        onChange={(e) => setAnalyticsType(e.target.value)}
                    >
                        <option value={'biochemistry-analytics'}>BIOQUÍMICA</option>
                        <option value={'hematology-analytics'}>HEMATOLOGIA</option>
                        <option value={'coagulation-analytics'}>COAGULAÇÃO</option>
                    </select>
                    <span className="flex justify-center rounded-md border border-borderColor text-textSecondary">
                        <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
                    </span>
                </div>
                <span className="mt-8 flex items-center justify-center rounded-xl border border-textSecondary p-4 shadow-md md:mt-8 md:p-8">
                    <Image
                        className="rounded-xl object-cover"
                        fetchPriority="high"
                        src="/lab.jpg"
                        width={500}
                        height={500}
                        alt="Imagem do laboratório"
                        priority={true}
                    />
                </span>
            </main>
            <Footer />
        </div>
    );
};

export default Reports;
