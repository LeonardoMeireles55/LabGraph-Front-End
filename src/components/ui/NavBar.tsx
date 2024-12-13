import CsvGenerator from '@/components/util/CsvGenerator';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  text: string;
  url: string;
}

interface NavBarProps {
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}

const NavBar: React.FC<NavBarProps> = ({ jsonData, fileName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { text: 'BIOQUÍMICA', url: '/biochemistry' },
    { text: 'COAGULAÇÃO', url: '/coagulation' },
    { text: 'HEMATOLOGIA', url: '/hematology' },
    { text: 'RELATÓRIOS', url: '/reports' },
    { text: 'TABELAS', url: '/analytics-table' },
    { text: 'INFORMAÇÕES', url: 'https://github.com/LeonardoMeireles55/QualityLab-Pro-Backend' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-navbar xl:p-2 shadow-xl shadow-overlay">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-textPrimary text-xl font-bold">LabGraph</span>
              <span className="text-textSecondary text-xs -mt-1">versão 0.3</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-textPrimary hover:text-textPrimary text-sm font-normal transition-colors duration-300 relative group"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            <div className="p-2 hidden  md:block rounded-md">
              <CsvGenerator jsonData={jsonData} fileName={fileName} />
            </div>
            <ThemeToggle />

          </div>
          <span className='md:hidden absolute right-11 top-4'>
            <ThemeToggle />
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute w-full bg-surface shadow-lg shadow-shadow transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'
          } overflow-hidden`}
      >
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block text-textPrimary hover:text-textPrimary text-sm font-light transition-colors duration-300"
            >
              {link.text}
            </a>
          ))}
          <div className="w-full flex justify-start text-sm font-medium p-0 transition-colors duration-300">
            <CsvGenerator jsonData={jsonData} fileName={fileName} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
