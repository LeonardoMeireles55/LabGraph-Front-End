import NavBar from '@/components/shared/navigation-bar';
import Head from 'next/head';
import { ReportsHeaderProps } from '../types/Reports';

const ReportsHeader = ({ analyticsType }: ReportsHeaderProps) => (
  <>
    <Head>
      <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
    </Head>
    <NavBar />
  </>
);

export default ReportsHeader;
