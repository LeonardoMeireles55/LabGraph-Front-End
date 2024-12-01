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
      className="flex items-center justify-between px-4 py-3 rounded-md shadow-xl "
      style={{
        backgroundColor: colors.background,
        borderBottom: `1px solid ${colors.textSecondary}`,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded-full flex-shrink-0"
          style={{ backgroundColor: colors.primary }}
        ></div>
        <span
          className="text-lg font-semibold text-gray-800"
          style={{ color: colors.textPrimary }}
        >
          LabGraph® 0.2
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-6">
      {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="text-sm font-medium transition-colors duration-200 hover:text-blue-600"
                style={{ color: colors.textSecondary }}
              >
                {link.text}
              </a>
          </li>
        ))}
      </ul>

      <button
        className="hidden md:inline-block px-4 py-2 rounded-md text-sm font-semibold"
        style={{
          backgroundColor: colors.accent,
          color: colors.textPrimary,
        }}
      >
        Em breve
      </button>

      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="sr-only">Toggle navigation</span>
        <div className="space-y-2">
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
        </div>
      </button>

      {isMenuOpen && (
        <ul
          className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden"
          style={{
            backgroundColor: colors.background,
          }}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="text-sm font-medium transition-colors duration-200 hover:text-blue-600"
                style={{ color: colors.textSecondary }}
              >
                {link.text}
              </a>
            </li>
          ))}
          <li>
            <button
              className="px-4 py-2 rounded-md text-sm font-semibold"
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
            >
              Em breve
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
