import { useEffect, useState } from 'react';
import useColors from './useColors';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>();
    const { colors, changeTheme } = useColors();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            changeTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
            setTheme(savedTheme === 'dark' ? 'dark' : 'light');
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
    }, [changeTheme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        changeTheme(theme === 'light' ? 'dark' : 'light');

    };

    return { theme, toggleTheme };
};

export default useTheme;
