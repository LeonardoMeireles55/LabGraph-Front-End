import { ListingItem } from '@/components/charts/types/Chart';
import NavBar from '@/components/shared/navigation-bar';
import Head from 'next/head';

interface ReportsHeaderProps {
  analyticsType: string;
  dataFetched: ListingItem[];
}

const ReportsHeader = ({ analyticsType, dataFetched }: ReportsHeaderProps) => (
  <>
    <Head>
      <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
    </Head>
    <NavBar jsonData={dataFetched} fileName={analyticsType} />
  </>
);

export default ReportsHeader;
