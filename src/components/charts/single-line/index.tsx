import ControlChart from '@/components/charts/single-line/components/ControlChart';
import NavBar from '@/components/shared/navigation-bar';
import TestSelectorWithLevel from '@/components/shared/test-selector/common-selector';
import Footer from '@/components/shared/ui/footer';
import Loading from '@/components/shared/utils/components/loading';
import Head from 'next/head';
import { useState } from 'react';
import { LabGraphProps, ListingItem } from '../types/Chart';

const LabGraph: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {
  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

  return (
    <div className='min-h-min gap-4'>
      <NavBar />
      <div className='flex min-h-min flex-col place-content-center items-center bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] || ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='mb-4 ml-4 mt-12 flex justify-start md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithLevel
              name={testList[0]}
              level={1}
              setListingItem={setDataFetched}
              analyticsType={analyticsType}
              list={testList}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-center'>
            {!dataFetched[0] ? <Loading /> : <ControlChart listing={dataFetched} />}
          </div>
        </div>
      </div>
      <div className='mt-6 flex min-h-min flex-col content-center items-center justify-end xl:mt-8'>
        <Footer />
      </div>
    </div>
  );
};

export default LabGraph;
