import React, { useState } from 'react';

interface NavLink {
  text: string;
  url: string;
}

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { text: 'BIOQUÍMICA', url: '/biochemistry' },
    { text: 'COAGULAÇÃO', url: '/coagulation' },
    { text: 'HEMATOLOGIA', url: '/hematology' },
    { text: 'INFORMAÇÕES', url: 'https://github.com/LeonardoMeireles55/QualityLab-Pro-Backend' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-background text-xl font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-textPrimary text-xl font-bold">LabGraph</span>
              <span className="text-textSecondary text-xs -mt-1">versão 0.2</span>
            </div>

          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-textSecondary hover:text-textPrimary text-sm font-medium 
                  transition-colors duration-300 relative group"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary 
                  group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button className="px-4 py-2 bg-primary text-background rounded-lg text-sm 
              font-medium shadow-lg hover:scale-105 hover:bg-primary/90 transition-colors duration-300">
              Em breve
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300
                ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300
                ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-textPrimary transition-all duration-300
                ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-background shadow-lg 
        transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
        <div className="px-4 py-3 space-y-3">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block text-textSecondary hover:text-textPrimary text-sm 
                font-medium transition-colors duration-300"
            >
              {link.text}
            </a>
          ))}
          <button className="w-full px-4 py-2 bg-primary text-background rounded-lg 
            text-sm font-medium shadow-md hover:bg-primary/90 transition-colors duration-300">
            Em breve
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;