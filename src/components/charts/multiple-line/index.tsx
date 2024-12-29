import React, { useState } from 'react';
import Loading from '@/components/utils/components/loading';
import TestSelectorWithoutLevel from '@/components/shared/test-selector/custom-selector';
import Head from 'next/head';
import { MultipleLineGraphProps, LevelGroupResponse } from '../types/Chart';
import Footer from '../../ui/footer';
import NavBar from '../../ui/navigation-bar';
import MultipleLineControlChart from './components/MultipleLineControlChart';

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
    const [groupResponse, setGroupResponse] = useState<LevelGroupResponse[]>([]);

    return (
        <div className="min-h-min">
            <NavBar jsonData={groupResponse} fileName={testList[0]} />
            <div className="flex min-h-min flex-col content-center items-center justify-evenly bg-background">
                <Head>
                    <title>{`LabGraph - ${testList[0] || ''}`}</title>
                </Head>
                <div className="flex flex-col">
                    <div className="flex justify-evenly mt-14 mb-8 xl:mb-8 md:mt-24 xl:mt-32">
                        <TestSelectorWithoutLevel
                            name={testList[0]}
                            setListinig={setGroupResponse}
                            analyticsType={analyticsType}
                            list={testList}
                        />
                    </div>
                    <div className="flex w-screen min-h-full flex-col items-center justify-evenly">
                        {!groupResponse[0] ? (
                            <Loading />
                        ) : (
                            <MultipleLineControlChart listings={groupResponse} />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MultipleLineLabGraph;