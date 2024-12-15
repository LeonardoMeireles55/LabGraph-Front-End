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
        {
            text: 'INFORMAÇÕES',
            url: 'https://github.com/LeonardoMeireles55/QualityLab-Pro-Backend',
        },
    ];

    return (
        <nav className="transition-theme fixed left-0 top-0 z-50 w-full bg-navbar shadow-xl shadow-overlay">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between sm:h-20">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-lg sm:h-10 sm:w-10">
                            <span className="text-lg font-bold text-white sm:text-xl">L</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-textPrimary sm:text-xl">LabGraph</span>
                            <span className="-mt-1 text-[10px] text-textSecondary sm:text-xs">versão 0.3</span>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex xl:gap-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="transition-theme-fast group relative text-sm font-normal text-textPrimary hover:text-textPrimary xl:text-base"
                            >
                                {link.text}
                                <span className="transition-theme-fast absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full"></span>
                            </a>
                        ))}

                        <div className="hidden rounded-md p-2 lg:block">
                            <CsvGenerator jsonData={jsonData} fileName={fileName} />
                        </div>
                        <ThemeToggle />
                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                        <ThemeToggle />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle menu">
                            <div className="space-y-2">
                                <span
                                    className={`block h-0.5 w-6 bg-textPrimary transition-transform duration-300 ${
                                        isMenuOpen ? 'translate-y-2.5 rotate-45 transform' : ''
                                    }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-textPrimary transition-opacity duration-300 ${
                                        isMenuOpen ? 'opacity-0' : ''
                                    }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-textPrimary transition-transform duration-300 ${
                                        isMenuOpen ? '-translate-y-2.5 -rotate-45 transform' : ''
                                    }`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`transition-theme fixed left-0 right-0 top-16 bg-surface shadow-lg shadow-shadow sm:top-20 lg:hidden ${
                    isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            >
                <div className="space-y-0 px-6 py-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="block py-2 text-base font-normal text-textPrimary transition-colors duration-300 hover:text-textPrimary"
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
