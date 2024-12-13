import { useEffect, useState } from 'react';
import useColors from './useColors';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>();
    const { colors, changeTheme } = useColors();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
            changeTheme(initialTheme);
            setTheme(initialTheme === 'dark' ? 'dark' : 'light');
        }
    }, [changeTheme]);

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

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        changeTheme(newTheme);
    };

    return { theme, toggleTheme };
};

export default useTheme;
