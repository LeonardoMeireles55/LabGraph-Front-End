import { NavigationProps } from '@/features/about/types/about';
import NavLogo from '@/features/shared/navigation-bar/components/NavLogo';
import ThemeToggle from '@/features/shared/ui/theme';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const NAVIGATION_ITEMS: NavigationProps[] = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'features', label: 'FEATURES' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'faq', label: 'FAQ' },
  { id: 'team', label: 'TEAM' },
];

const AboutNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className='sticky top-0 z-50 border-b border-borderColor bg-navbar italic backdrop-blur-sm'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex items-center justify-between py-8'>
          <div className='flex flex-col'>
            <NavLogo />
            {/* <h1 className='text-2xl sm:text-4xl font-bold text-primary italic tracking-tight'>
              &lt;LabGraph&gt;{}
              <span className='text-[10px] sm:text-xs opacity-90 align-top'>®</span>
            </h1>
            <p className='text-[8px] text-center sm:text-sm text-primary opacity-70 italic'>
              Quality Management System
            </p> */}
          </div>

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-6 lg:flex'>
            <ul className='flex items-center space-x-6 text-sm sm:text-base'>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className='whitespace-nowrap italic text-textSecondary transition-colors hover:text-primary hover:underline hover:decoration-primary hover:decoration-1'
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href='/auth/signup'
                  className='rounded-lg bg-secondary px-4 py-2 font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
                >
                  TRY DEMO
                </Link>
              </li>
            </ul>
            <div className='border-l border-borderColor pl-6'>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center gap-4 lg:hidden'>
            <Link
              href='/auth/signup'
              className='rounded-lg bg-secondary px-3 py-1.5 text-sm font-light italic text-white transition-colors duration-300 hover:bg-secondaryHover'
            >
              DEMO
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 text-textSecondary hover:text-primary'
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-28 bg-surface p-4 shadow-xl shadow-shadow lg:hidden ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-300`}
      >
        <div className='flex flex-col space-y-4'>
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='text-left text-sm font-normal text-textSecondary hover:text-primary'
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AboutNavbar;
