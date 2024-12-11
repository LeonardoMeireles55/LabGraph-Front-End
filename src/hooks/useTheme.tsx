import { useEffect, useState } from 'react';
import useColors from './useColors';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>();  // Inicializa o estado com 'light'
    const { colors, changeTheme } = useColors();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            // Define o tema com base na preferência do usuário ou no tema salvo
            changeTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
            setTheme(savedTheme === 'dark' ? 'dark' : 'light');
        }
    }, []);  // Esse efeito só é executado uma vez, ao montar o componente

    useEffect(() => {
        if (theme) {
            // Atualiza o localStorage e a tag HTML
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark'); // Adiciona a classe 'dark'
            } else {
                document.documentElement.classList.remove('dark'); // Remove a classe 'dark'
            }
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        changeTheme(theme === 'light' ? 'dark' : 'light');

    };

    return { theme, toggleTheme };
};

export default useTheme;
