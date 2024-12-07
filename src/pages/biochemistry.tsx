import useWindowDimensions from '@/hooks/useWindowDimensions';
import Head from 'next/head';
import { useEffect, useState } from "react";
import Footer from '@/components/ui/Footer';
import DateSelector from '@/components/functional/DateSelector';
import TestSelector from '@/components/chart/TestSelector';
import NavBar from '@/components/ui/NavBar';
import ControlChart from '@/components/chart/ControlChart';
import useFetchListing from '@/hooks/useFetchListing';
import Loading from '@/components/ui/Loading';
import colors from '../styles/colors';
import CsvGenerator from '@/util/CsvGenerator';

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

interface ListingCollection extends Array<ListingItem> {}

const list = [
    "ALB2", "ALP2S", "ALTL", "AMYL2", "ASTL", "BILD2",
    "BILT3", "CA2", "CHOL2", "CK2", "CKMB2", "CL-I",
    "CREJ2", "CRP4", "GGTI2", "GLUC3", "HDLC4", "K-I",
    "LDHI2", "LIP", "MG-2", "NA-I", "PHOS2", "TRIGL",
    "UA2", "UREL"
]

export default function Biochemistry() {
    
    const defaultDate = new Date();

    const { width = 800, height = 600 } = useWindowDimensions();

    const [testName, setTestName] = useState<string>('ALB2');
    const [testLevel, setTestLevel] = useState<number>(1);

    const [ownMean, setOwnMean] = useState<number>(0) || null;
    const [ownSd, setOwnSd] = useState<number>(0) || null;
    const [unitValue, setUnitValue] = useState<string>('') || null;


    const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth());
    const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate());
    const [initialDay, setInitialDay] = useState<number>(14);
    const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
    const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());    

    const baseUrl = "https://leomeireles-dev.xyz/api/biochemistry-analytics/results/search/date-range?name=";
    const meanAndDeviationUrl = "https://leomeireles-dev.xyz/api/biochemistry-analytics/results/mean-standard-deviation?name="
    const url = `${baseUrl}${testName}&level=${testLevel}&dateStart=${initialYear}-${initialMonth}-${initialDay}&dateEnd=${secondYear}-${secondMonth}-${secondDay}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testName}&level=${testLevel}&dateStart=${initialYear}-${initialMonth}-${initialDay}&dateEnd=${secondYear}-${secondMonth}-${secondDay}`;

    const {listing, ownMeanValue, ownSdValue, unitValues} = useFetchListing({
        url: url,
        urlMeanAndDeviation: urlMeanAndDeviation,
        initialYear: initialYear,
        initialMonth: initialMonth,
        initialDay: initialDay,
        secondYear: secondYear,
        secondMonth: secondMonth,
        secondDay: secondDay,
      });

    return (
        <div className="w-full h-screen flex justify-center items-center content-center flex-col bg-background p-2 md:p-0">
        <Head>
            <title>{`LabGraph - ${testName || ''}`}</title>
        </Head>
        <NavBar jsonData={listing} fileName={testName}/>
        <div className="flex flex-col justify-center items-center content-center w-full h-full md:w-5/6 lg:w-4/4 xl:max-w-7xl p-0">
            <div className="flex justify-center items-center content-center bg-background p-2 md:p-0 lg:p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-0">
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
                    setSecondYear={setSecondYear}/>
                    <div className="">
                        {!listing[0] ? <Loading /> : <TestSelector analyticsType={"biochemistry"} list={list}
                        testName={testName} setTestName={setTestName} testLevel={testLevel} 
                        setTestLevel={setTestLevel} 
                        mean={listing[0].mean} sd={listing[0].sd} ownMean={ownMeanValue} ownSd={ownSdValue} unitValue={unitValues} />}
                        </div>
                    </div>
                </div>
                {!listing[0] ? <Loading /> :  <ControlChart listing={listing} width={width} height={height} colors={colors.lightColors} />}
            </div>
            <Footer  />
        </div>
    );
}
