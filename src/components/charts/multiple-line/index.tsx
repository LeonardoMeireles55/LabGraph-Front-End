import NavBar from '@/components/shared/navigation-bar';
import TestSelectorWithoutLevel from '@/components/shared/test-selector/custom-selector';
import Footer from '@/components/shared/ui/footer';
import Loading from '@/components/shared/utils/components/loading';
import Head from 'next/head';
import React, { useState } from 'react';
import { LevelGroupResponse, MultipleLineGraphProps } from '../types/Chart';
import MultipleLineControlChart from './components/MultipleLineControlChart';

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
  const [groupResponse, setGroupResponse] = useState<LevelGroupResponse[]>([]);

  return (
    <div className='min-h-min'>
      <NavBar jsonData={groupResponse} fileName={testList[0]} />
      <div className='flex min-h-min flex-col content-center items-center justify-evenly bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] || ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='mb-8 mt-14 flex justify-evenly md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithoutLevel
              name={testList[0]}
              setListinig={setGroupResponse}
              analyticsType={analyticsType}
              list={testList}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-evenly'>
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
