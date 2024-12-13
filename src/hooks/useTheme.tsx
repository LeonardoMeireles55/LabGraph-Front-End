import { useEffect, useState } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
            setTheme(initialTheme === 'dark' ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme]);

    return { theme, toggleTheme, setTheme };
};

export default useTheme;
