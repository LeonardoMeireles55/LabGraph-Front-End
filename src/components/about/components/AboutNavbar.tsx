import { NavigationItem } from '@/components/about/types/about';
import ThemeToggle from '@/components/shared/ui/theme';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const NAVIGATION_ITEMS: NavigationItem[] = [
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
    <nav className='sticky top-0 bg-navbar backdrop-blur-sm z-50 border-b border-borderColor italic'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl sm:text-4xl font-semibold text-primary italic tracking-tight'>
              &lt;LabGraph&gt;{' '}
              <span className='text-[8px] sm:text-xs opacity-90 align-top'>®</span>
            </h1>
            <p className='text-[8px] text-center sm:text-sm text-textPrimary opacity-70 italic'>
              Quality Management System
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-6'>
            <ul className='flex space-x-6 text-sm sm:text-base items-center'>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className='text-textSecondary hover:text-primary italic transition-colors whitespace-nowrap'
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href='/auth/signup'
                  className='px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondaryHover transition-colors duration-300 italic font-light'
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
          <div className='lg:hidden flex items-center gap-4'>
            <Link
              href='/auth/signup'
              className='px-3 py-1.5 bg-secondary text-white text-sm rounded-lg hover:bg-secondaryHover transition-colors duration-300 italic font-light'
            >
              DEMO
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-textSecondary hover:text-primary p-2'
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 right-0 top-[4rem] bg-surface p-4 shadow-xl shadow-shadow lg:hidden ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-300`}
      >
        <div className='flex flex-col space-y-4'>
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='text-sm font-normal text-textSecondary hover:text-primary text-left'
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
