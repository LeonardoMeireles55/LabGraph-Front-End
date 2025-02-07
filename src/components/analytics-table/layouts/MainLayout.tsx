import NavBar from '@/components/shared/navigation-bar';
import Footer from '@/components/shared/ui/footer';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className='bg-background'>
      <div className='flex flex-col place-content-center items-center'>
        <title>{title}</title>
        <NavBar />
        <div className='w-full max-w-7xl'>{children}</div>
        <div className='flex flex-col items-center justify-end'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
