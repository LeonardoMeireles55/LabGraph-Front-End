import useTheme from '@/hooks/useTheme';
import React from 'react';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme(); // Obtenha o tema atual e a função de alternância

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 px-2 text-white rounded-full transition-all duration-300  focus:outline-none"
        >
            <span className="mr-2 text-lg hover:scale-110">
                {theme === 'light' ? '🌞' : '🌙'}
            </span>
            {/* <span className="text-sm font-medium">
                {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            </span> */}
        </button>
    );
};

export default ThemeToggle;
