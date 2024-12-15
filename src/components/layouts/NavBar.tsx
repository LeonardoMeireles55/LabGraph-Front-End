import CsvGenerator from '@/components/features/CsvGenerator';
import React, { useState } from 'react';
import ThemeToggle from '../common/ThemeToggle';

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-navbar shadow-xl shadow-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg sm:text-xl font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-textPrimary text-lg sm:text-xl font-bold">LabGraph</span>
              <span className="text-textSecondary text-[10px] sm:text-xs -mt-1">versão 0.3</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-textPrimary hover:text-textPrimary text-sm xl:text-base font-normal transition-colors duration-300 relative group"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            <div className="p-2 hidden lg:block rounded-md">
              <CsvGenerator jsonData={jsonData} fileName={fileName} />
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              <div className="space-y-2">
                <span
                  className={`block w-6 h-0.5 bg-textPrimary transition-transform duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-textPrimary transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-textPrimary transition-transform duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-16 sm:top-20 left-0 right-0 bg-surface shadow-lg shadow-shadow transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="px-6 py-4 space-y-0">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block text-textPrimary hover:text-textPrimary text-base font-normal transition-colors duration-300 py-2"
            >
              {link.text}
            </a>
          ))}
          <div className="py-2">
            <CsvGenerator jsonData={jsonData} fileName={fileName} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
