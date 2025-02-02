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
      <NavBar jsonData={dataFetched} fileName={testList[0]} />
      <div className='flex flex-col items-center content-center min-h-min justify-center bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] || ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='flex mb-4 mt-12 ml-4 justify-start md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithLevel
              name={testList[0]}
              level={1}
              setListingItem={setDataFetched}
              analyticsType={analyticsType}
              list={testList}
            />
          </div>
          <div className='flex flex-col items-center w-screen min-h-full justify-center'>
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
