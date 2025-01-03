import ControlChart from '@/components/charts/single-line/components/ControlChart';
import TestSelectorWithLevel from '@/components/shared/test-selector/common-selector';
import Loading from '@/components/utils/components/loading';
import Head from 'next/head';
import { useState } from 'react';
import Footer from '../../ui/footer';
import NavBar from '../../ui/navigation-bar';
import { LabGraphProps, ListingItem } from '../types/Chart';

const LabGraph: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {
  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

  return (
    <div className='min-h-min'>
      <NavBar jsonData={dataFetched} fileName={testList[0]} />
      <div className='flex flex-col items-center content-center min-h-min justify-evenly bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] || ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='flex mb-8 mt-14 justify-evenly md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithLevel
              name={testList[0]}
              level={1}
              setListingItem={setDataFetched}
              analyticsType={analyticsType}
              list={testList}
            />
          </div>
          <div className='flex flex-col items-center w-screen min-h-full justify-evenly'>
            {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} />}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center content-center justify-end mt-6 min-h-min xl:mt-8'>
        <Footer />
      </div>
    </div>
  );
};

export default LabGraph;
