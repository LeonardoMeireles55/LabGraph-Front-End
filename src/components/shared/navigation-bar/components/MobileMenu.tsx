import CsvGenerator from '@/components/features/csv-generator';
import Link from 'next/link';
import navLinks from '../constants/navLinks';
import { MobileMenuProps } from '../types/NavigationBar';
import ViewToggleButton from './ViewToggleButton';

const MobileMenu = ({ isMenuOpen, onLogout, jsonData, fileName }: MobileMenuProps) => (
  <div
    className={`fixed left-0 right-0 top-[4rem] bg-surface p-2 shadow-xl shadow-shadow sm:top-20 lg:hidden ${
      isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}
  >
    <div className='flex flex-col space-y-2'>
      {[...navLinks, { text: 'EXIT', url: '/auth/login', onClick: onLogout }].map((link, index) => (
        <Link
          key={index}
          href={link.url}
          onClick={link.onClick}
          className='text-sm font-normal text-textSecondary hover:text-primary'
        >
          {link.text}
        </Link>
      ))}
      <hr className='border-t-[0.5px] border-textSecondary' />
      <span className='flex flex-col w-full'>
        <ViewToggleButton />
        <CsvGenerator jsonData={jsonData} fileName={fileName} />
      </span>
    </div>
  </div>
);

export default MobileMenu;
