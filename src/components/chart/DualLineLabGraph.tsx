import React, { useCallback, useState } from 'react';
import Loading from '@/components/common/Loading';
import TestSelector2 from '@/components/common/TestSelectorWithoutLevel';
import Footer from '@/components/layouts/Footer';
import Head from 'next/head';
import { DualLineControlChartProps, DualLineLabGraphProps, ListingsData } from '../../types/chartInterfaces';
import DualLineControlChart from './DualLineControlChart';
import NavBar from '../layouts/NavBar';

const DualLineLabGraph: React.FC<DualLineLabGraphProps> = ({ testList, analyticsType }) => {
    const [listings, setListings] = useState<ListingsData>({ level1: [], level2: [] });

    const handleListingsUpdate = useCallback((data: ListingsData) => {
        setListings(data);
    }, []);

    return (
        <div className="min-h-min">
            <NavBar jsonData={listings.level1} fileName={testList[0]} />
            <div className="flex min-h-min flex-col content-center items-center justify-evenly bg-background ">
                <Head>
                    <title>{`LabGraph - ${testList[0] || ''}`}</title>
                </Head>
                <div className="flex flex-col">
                    <div className="flex justify-evenly mt-14 mb-8 xl:mb-8  md:mt-24 xl:mt-32">
                        <TestSelector2
                            name={testList[0]}
                            setListinig={handleListingsUpdate}
                            analyticsType={analyticsType}
                            list={testList}
                        />
                    </div>
                    <div className="flex w-screen min-h-full flex-col items-center justify-evenly">
                        {!listings.level1.length || !listings.level2.length ? (
                            <Loading />
                        ) : (
                            <DualLineControlChart
                                listingOne={listings.level1}
                                listingTwo={listings.level2}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-6 min-h-min xl:mt-8 flex flex-col justify-end items-center content-center">
                <Footer />
            </div>
        </div>
    );
};

export default React.memo(DualLineLabGraph);
