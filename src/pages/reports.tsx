import Head from 'next/head';
import Image from 'next/image'
import { useEffect, useState } from "react";
import Footer from '@/components/ui/Footer';
import NavBar from '@/components/ui/NavBar';
import DateSelector from '@/components/functional/DateSelector';
import GenerateReports from '@/components/util/GenerateReports';
import formatDateWithTime from '@/components/functional/formatDateWithTime';

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
    const [analyticsType, setAnalyticsType] = useState<string>("biochemistry-analytics");

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
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={analyticsType} />
            <main className="flex-grow flex flex-col justify-center items-center mt-12 md:mt-8 bg-background p-4 md:p-8">
                <div className="grid md:flex gap-2 text-textSecondary">
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
                        className="bg-muted text-textSecondary rounded p-0 text-xs md:px-2 md:py-1 md:text-sm"
                        value={analyticsType}
                        onChange={(e) => setAnalyticsType(e.target.value)}
                    >
                        <option value={"biochemistry-analytics"}>BIOQUÍMICA</option>
                        <option value={"hematology-analytics"}>HEMATOLOGIA</option>
                        <option value={"coagulation-analytics"}>COAGULAÇÃO</option>
                    </select>
                    <GenerateReports jsonData={dataFetched} fileName={analyticsType} />
                </div>
                <span className="border border-textSecondary rounded-xl mt-8 p-4 md:p-8 md:mt-8 flex justify-center items-center shadow-md">
                    <Image
                        className="rounded-xl object-cover"
                        src="/lab.jpg"
                        width={500}
                        height={500}
                        alt="Imagem do laboratório"
                    />
                </span>
            </main>
            <Footer />
        </div>
    );
};

export default Reports;
