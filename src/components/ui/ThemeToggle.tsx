import useTheme from '@/hooks/useTheme';
import React from 'react';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full transition-all duration-300  focus:outline-none"
        >
            <span className="text-lg hover:scale-110">
                {theme === 'light' ? '🌞' : '🌙'}
            </span>
        </button>
    );
};

export default ThemeToggle;
