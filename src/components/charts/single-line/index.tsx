import ControlChart from '@/components/charts/single-line/components/ControlChart';
import Loading from '@/components/utils/components/loading';
import TestSelectorWithLevel from '@/components/commons/test-selector/common-selector';
import Head from 'next/head';
import { useState } from 'react';
import { ListingItem } from '../../../types/chartInterfaces';
import Footer from '../../ui/footer';
import NavBar from '../../ui/navigation-bar';


interface LabGraphProps {
    testList: string[];
    analyticsType: string;
}

const LabGraph: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {
    const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

    return (
        <div className="min-h-min">
            <NavBar jsonData={dataFetched} fileName={testList[0]} />
            <div className="flex min-h-min flex-col content-center items-center justify-evenly bg-background ">
                <Head>
                    <title>{`LabGraph - ${testList[0] || ''}`}</title>
                </Head>
                <div className="flex flex-col">
                    <div className="flex justify-evenly mt-14 mb-8 xl:mb-8 md:mt-24 xl:mt-32">
                        <TestSelectorWithLevel
                            name={testList[0]}
                            level={1}
                            setDataJson={setDataFetched}
                            analyticsType={analyticsType}
                            list={testList}
                        />
                    </div>
                    <div className="flex w-screen min-h-full flex-col items-center justify-evenly">
                        {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} />}
                    </div>
                </div>
            </div>
            <div className="mt-6 min-h-min xl:mt-8 flex flex-col justify-end items-center content-center">
                <Footer />
            </div>
        </div>

    );
};

export default LabGraph;
