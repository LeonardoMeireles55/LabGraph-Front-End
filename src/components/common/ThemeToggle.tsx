import React, { useEffect, useState } from 'react';
import useTheme from '@/hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme, isLoaded } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoaded) {
        return (
            <button
                className="rounded-full p-2 w-10 h-10"
                aria-label="Toggle theme"
            />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:scale-110 transition-transform duration-200 focus:outline-none"
            aria-label="Toggle theme"
        >
            <span className="text-xl">
                {theme === 'light' ? '🌞' : '🌙'}
            </span>
        </button>
    );
};

export default ThemeToggle;