import React, { useState } from 'react';
import colors from '../styles/colors';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { text: 'BIOQUÍMICA', url: '/' },
    { text: 'COAGULAÇÃO', url: '/acl' },
    { text: 'INFORMAÇÕES', url: 'https://github.com/LeonardoMeireles55/QualityLab-Pro-Backend' },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 w-full shadow-md z-50"
      style={{
        backgroundColor: colors.background,
        borderBottom: `1px solid ${colors.textSecondary}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center shadow-md flex-shrink-0 mr-3"
              style={{ 
                backgroundColor: colors.primary,
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` 
              }}
            >
              <span className="text-white text-xl font-bold">L</span>
            </div>
            <span
              className="text-xl font-bold tracking-wide"
              style={{ color: colors.textPrimary }}
            >
              LabGraph® 0.2
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-10"
                  style={{ 
                    color: colors.textSecondary,
                    backgroundColor: colors.background + '10',
                  }}
                >
                  {link.text}
                </a>
              ))}
              <button
                className="ml-4 px-4 py-2 rounded-lg text-base font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.textPrimary,
                }}
              >
                Em breve
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300"
              style={{
                color: colors.textPrimary,
                backgroundColor: colors.textPrimary + '10',
              }}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 rounded" style={{ backgroundColor: colors.textSecondary }}></span>
                <span className="block w-6 h-0.5 rounded" style={{ backgroundColor: colors.textSecondary }}></span>
                <span className="block w-6 h-0.5 rounded" style={{ backgroundColor: colors.textSecondary }}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="md:hidden absolute w-full shadow-lg"
          style={{ 
            backgroundColor: colors.background,
            borderBottom: `1px solid ${colors.textSecondary}`,
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out"
                style={{ 
                  color: colors.textSecondary,
                  backgroundColor: colors.muted + '20',
                }}
              >
                {link.text}
              </a>
            ))}
            <button
              className="w-full mt-2 px-4 py-2 rounded-lg text-base font-semibold shadow-md transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: colors.accent,
                color: colors.textPrimary,
              }}
            >
              Em breve
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;