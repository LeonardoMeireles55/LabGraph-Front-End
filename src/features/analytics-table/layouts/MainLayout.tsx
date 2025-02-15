import NavBar from '@/features/shared/navigation-bar';
import Footer from '@/features/shared/ui/footer';
import { MainLayoutProps } from '../types/AnalyticsTable';

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
