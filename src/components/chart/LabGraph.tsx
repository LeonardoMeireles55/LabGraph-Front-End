import ControlChart from '@/components/chart/ControlChart';
import Loading from '@/components/common/Loading';
import TestSelector from '@/components/common/TestSelector';
import Footer from '@/components/layouts/Footer';
import NavBar from '@/components/layouts/NavBar';
import Head from 'next/head';
import { useState } from 'react';
import { ListingItem } from '../types/chartInterfaces';


interface LabGraphProps {
    testList: string[];
    analyticsType: string;
}

const LabGraph: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {
    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

    return (
        <div className="h-screen">
            <NavBar jsonData={dataFetched} fileName={testList[0]} />
            <div className="flex h-screen flex-col content-center items-center justify-center bg-background">
                <Head>
                    <title>{`LabGraph - ${testList[0] || ''}`}</title>
                </Head>
                <div className=" flex h-full flex-col content-center justify-evenly rounded-lg bg-background sm:mt-0 md:mt-16 lg:mt-24">
                    <div className="flex content-center justify-center rounded-lg bg-background">
                        <TestSelector
                            name={testList[0]}
                            level={1}
                            setDataJson={setDataFetched}
                            analyticsType={analyticsType}
                            list={testList}
                        />
                    </div>
                    <div className="flex w-screen flex-col items-center justify-between">
                        {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} />}
                    </div>
                </div>
                <div className="mt-auto">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default LabGraph;
