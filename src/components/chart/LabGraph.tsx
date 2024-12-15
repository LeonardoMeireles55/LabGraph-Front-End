import Head from 'next/head';
import { useState } from 'react';
import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/layouts/NavBar';
import Loading from '@/components/common/Loading';
import TestSelector from '@/components/common/TestSelector';
import ControlChart from '@/components/chart/ControlChart';

interface ListingItem {
    name: string;
    level: number;
    level_lot: string;
    test_lot: string;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
    description: string;
}

interface LabGraphProps {
    testList: string[];
    analyticsType: string;
}

const LabGraph: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {
    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

    return (
        <div className="w-full h-screen mt-8 md:mt-16 flex justify-evenly flex-col items-center bg-background">
            <Head>
                <title>{`LabGraph - ${testList[0] || ''}`}</title>
            </Head>
            <NavBar jsonData={dataFetched} fileName={testList[0]} />
            <div className="flex flex-col justify-center content-center bg-background rounded-lg">
                <div className="justify-center content-center bg-background rounded-lg">
                    <TestSelector
                        name={testList[0]}
                        level={1}
                        setDataJson={setDataFetched}
                        analyticsType={analyticsType}
                        list={testList}
                    />

                </div>
            </div>
            {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} />}
            <Footer />
        </div>
    );
};

export default LabGraph;
