import CsvGenerator from '@/components/features/csv-generator';
import Link from 'next/link';
import handleLogout from '../constants/handleLogout';
import navLinks from '../constants/navLinks';
import { NavLinksComponentProps } from '../types/NavigationBar';
import ViewToggleButton from './ViewToggleButton';

const NavLinksComponent: React.FC<NavLinksComponentProps> = ({ jsonData, fileName }) => {
  const onLogout = () => handleLogout();

  return (
    <div className='hidden items-center gap-6 lg:flex xl:gap-8 px-6 py-3'>
      {[...navLinks, { text: 'EXIT', url: '/auth/login', onClick: onLogout }].map((link) => (
        <Link
          key={link.url}
          href={link.url}
          onClick={link.onClick}
          className='group relative px-3 py-2 text-sm font-medium text-textPrimary transition-all duration-300 ease-in-out xl:text-base'
        >
          {link.text}
          <span className='absolute bottom-0 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0' />
        </Link>
      ))}
      <div className='rounded-lg p-2 hover:bg-overlay transition-colors duration-300'>
        <CsvGenerator jsonData={jsonData} fileName={fileName} />
      </div>
      <div className='pl-2 border-l border-border'>
        <ViewToggleButton />
      </div>
    </div>
  );
};

export default NavLinksComponent;
