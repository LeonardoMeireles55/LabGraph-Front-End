import useTheme from '@/hooks/useTheme';
import React from 'react';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme(); // Obtenha o tema atual e a função de alternância

    return (
        <div>
            <button
                onClick={toggleTheme} // Alterna o tema quando clicado
                aria-label="Alternar Tema"
                className="p-2 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
                Alternar para {theme === 'light' ? '1' : '2'}
            </button>
        </div>
    );
};

export default ThemeToggle;
