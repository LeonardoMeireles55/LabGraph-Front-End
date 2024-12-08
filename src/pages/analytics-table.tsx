import Head from 'next/head';
import { useState } from "react";
import Footer from '@/components/ui/Footer';
import TestSelector from '@/components/chart/TestSelector';
import NavBar from '@/components/ui/NavBar';
import ListingTable from '@/components/util/ListingTable';

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

const list = [
    "ALB2", "ALP2S", "ALTL", "AMYL2", "ASTL", "BILD2",
    "BILT3", "CA2", "CHOL2", "CK2", "CKMB2", "CL-I",
    "CREJ2", "CRP4", "GGTI2", "GLUC3", "HDLC4", "K-I",
    "LDHI2", "LIP", "MG-2", "NA-I", "PHOS2", "TRIGL",
    "UA2", "UREL"
];

const AnalyticsTable = () => {
    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

    return (
        <div className="w-full h-screen flex justify-center items-center content-center mt-12 md:mt-8 bg-background p-4 md:p-8">
            <Head>
                <title>{`LabGraph - ${list[0] || 'Quality-Lab-Pro'}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={list[0]} />
            <div className="flex flex-col justify-center items-center content-center">
                <div className="flex flex-col mt-16 justify-center items-center content-center bg-background lg:p-4 rounded-lg ">
                    <TestSelector
                        name={list[0]}
                        level={1}
                        setDataJson={setDataFetched}
                        analyticsType="biochemistry-analytics"
                        list={list}
                    />
                    <ListingTable items={dataFetched} />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTable;