import router from 'next/router';
import { useState } from 'react';
import ThemeToggle from '../theme';
import MobileMenu from './components/MobileMenu';
import NavLinksComponent from './components/NavLinksComponent';
import NavLogo from './components/NavLogo';
import handleLogout from './constants/handleLogout';
import { NavBarProps } from './types/NavigationBar';

const NavBar: React.FC<NavBarProps> = ({ jsonData, fileName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onLogout = () => handleLogout(router);

  return (
    <nav className='fixed left-0 top-0 z-50 w-full bg-navbar shadow-xl shadow-overlay'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between sm:h-20'>
          <NavLogo />
          <NavLinksComponent />
          <span className='hidden lg:flex'>
            <ThemeToggle />
          </span>
          <div className='flex items-center gap-4 lg:hidden'>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2'
              aria-label='Toggle menu'
            >
              <div className='space-y-2'>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`block h-0.5 w-6 bg-textPrimary transition-all duration-300 ${
                      isMenuOpen && i === 0
                        ? 'translate-y-2.5 rotate-45'
                        : isMenuOpen && i === 1
                          ? 'opacity-0'
                          : isMenuOpen && i === 2
                            ? '-translate-y-2.5 -rotate-45'
                            : ''
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu
        isMenuOpen={isMenuOpen}
        onLogout={onLogout}
        jsonData={jsonData}
        fileName={fileName}
      />
    </nav>
  );
};

export default NavBar;
