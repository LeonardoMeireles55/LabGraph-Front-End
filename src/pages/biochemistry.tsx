import useWindowDimensions from '@/hooks/useWindowDimensions';
import Head from 'next/head';
import { useState } from "react";
import Footer from '@/components/ui/Footer';
import TestSelector from '@/components/chart/TestSelector';
import NavBar from '@/components/ui/NavBar';
import ControlChart from '@/components/chart/ControlChart';
import Loading from '@/components/ui/Loading';
import colors from '../styles/colors';

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

interface ListingCollection extends Array<ListingItem> { }

const list = [
    "ALB2", "ALP2S", "ALTL", "AMYL2", "ASTL", "BILD2",
    "BILT3", "CA2", "CHOL2", "CK2", "CKMB2", "CL-I",
    "CREJ2", "CRP4", "GGTI2", "GLUC3", "HDLC4", "K-I",
    "LDHI2", "LIP", "MG-2", "NA-I", "PHOS2", "TRIGL",
    "UA2", "UREL"
]


export default function Biochemistry() {

    const [dataFetched, setDataFetched] = useState<ListingCollection>([]);

    const { width = 800, height = 600 } = useWindowDimensions();

    return (
        <div className="w-full min-h-svh flex justify-center items-center content-center flex-col bg-background p-2 md:p-0">
            <Head>
                <title>{`LabGraph - ${list[0] || ''}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={list[0]} />
            <div className="flex flex-col justify-center items-center content-center gap-8 md:gap-8 lg:gap-0 xl:gap-8 md w-screen h-4/6 md:w-5/6 lg:w-screen xl:max-w-7xl">
                <div className="flex justify-around items-center content-center bg-background lg:p-4 rounded-lg lg:w-screen ">
                    <div className="flex justify-center items-center content-center mt-16 bg-background lg:p-4 rounded-lg lg:w-screen ">
                        {<TestSelector name={list[0]} level={1} setDataJson={setDataFetched} analyticsType={"biochemistry-analytics"} list={list} />}
                    </div>
                </div>
                {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} width={width} height={height} colors={colors.lightColors} />}
                <Footer />
            </div>
        </div>
    );
}
