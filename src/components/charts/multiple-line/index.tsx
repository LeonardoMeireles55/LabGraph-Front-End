import React, { useCallback, useState, useMemo } from 'react';
import Loading from '@/components/utils/components/loading';
import TestSelectorWithoutLevel from '@/components/commons/TestSelectorWithoutLevel';
import Head from 'next/head';
import { MultipleLineGraphProps, ListingsData } from '../../../types/chartInterfaces';
import Footer from '../../ui/footer';
import NavBar from '../../ui/navigation-bar';
import MultipleLineControlChart from './components/MultipleLineControlChart';

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType, levelListSize }) => {
    const [listings, setListings] = useState<ListingsData>({ level1: [], level2: [], level3: [] });

    const handleListingsUpdate = useCallback((data: ListingsData) => {
        setListings(data);
    }, []);

    const transformedListings = useMemo(() => 
        [listings.level1, listings.level2, listings.level3]
            .filter((listing): listing is any[] => 
                listing !== undefined && listing.length > 0
            ),
        [listings]
    );

    const isLoading = useMemo(() => {
        const expectedLevels = Math.min(levelListSize, 3);
        const availableLevels = transformedListings.length;
        return availableLevels < expectedLevels;
    }, [levelListSize, transformedListings]);

    return (
        <div className="min-h-min">
            <NavBar jsonData={listings.level1} fileName={testList[0]} />
            <div className="flex min-h-min flex-col content-center items-center justify-evenly bg-background ">
                <Head>
                    <title>{`LabGraph - ${testList[0] || ''}`}</title>
                </Head>
                <div className="flex flex-col">
                    <div className="flex justify-evenly mt-14 mb-8 xl:mb-8  md:mt-24 xl:mt-32">
                        <TestSelectorWithoutLevel
                            name={testList[0]}
                            setListinig={handleListingsUpdate}
                            analyticsType={analyticsType}
                            list={testList} levelListSize={levelListSize}                        />
                    </div>
                    <div className="flex w-screen min-h-full flex-col items-center justify-evenly">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <MultipleLineControlChart
                                listings={transformedListings}
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

export default React.memo(MultipleLineLabGraph);
