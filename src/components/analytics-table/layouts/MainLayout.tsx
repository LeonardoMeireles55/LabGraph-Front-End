import NavBar from '@/components/shared/navigation-bar';
import Footer from '@/components/shared/ui/footer';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  jsonData: any;
  fileName: string;
}

const MainLayout = ({ children, title, jsonData, fileName }: MainLayoutProps) => {
  return (
    <div className='min-h bg-background'>
      <div className='min-h flex flex-col content-center items-center justify-center'>
        <title>{title}</title>
        <NavBar jsonData={jsonData} fileName={fileName} />
        <div className='w-full max-w-7xl'>{children}</div>
        <div className='flex flex-col items-center justify-end'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
