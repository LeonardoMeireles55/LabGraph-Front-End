import useTheme from '@/components/ui/theme/hooks/useTheme';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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
            className="rounded-full bg-surface/80 p-2
                     hover:bg-surface focus:outline-none"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Sun className="h-7 w-7 text-sun hover:scale-115" />
            ) : (
                <Moon className="h-7 w-7 text-moon hover:scale-115" />
            )}
        </button>
    );
};

export default ThemeToggle;
