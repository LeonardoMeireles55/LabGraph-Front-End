import useTheme from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const { theme, toggleTheme, isLoaded } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoaded) {
        return <button className="h-10 w-10 rounded-full p-2" aria-label="Toggle theme" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Toggle theme"
        >
            <span className="text-xl">{theme === 'light' ? '🌞' : '🌙'}</span>
        </button>
    );
};

export default ThemeToggle;
