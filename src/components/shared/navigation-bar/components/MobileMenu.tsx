import CsvGenerator from '@/components/features/csv-generator';
import Link from 'next/link';
import navLinks from '../constants/navLinks';
import { MobileMenuProps } from '../types/NavigationBar';
import ViewToggleButton from './ViewToggleButton';

const MobileMenu = ({ isMenuOpen, onLogout, jsonData, fileName }: MobileMenuProps) => (
  <div
    className={`fixed left-0 right-0 top-[4rem] bg-surface p-4 shadow-lg shadow-shadow sm:top-20 lg:hidden ${
      isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}
  >
    <div className='flex flex-col space-y-4'>
      {[...navLinks, { text: 'EXIT', url: '/login', onClick: onLogout }].map((link, index) => (
        <Link
          key={index}
          href={link.url}
          onClick={link.onClick}
          className='text-base font-normal text-textPrimary hover:text-primary'
        >
          {link.text}
        </Link>
      ))}
      <ViewToggleButton />
      <CsvGenerator jsonData={jsonData} fileName={fileName} />
    </div>
  </div>
);

export default MobileMenu;
