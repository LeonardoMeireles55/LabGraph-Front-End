import useTheme from '@/components/ui/theme/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme, isLoaded } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return <button className='h-10 w-10 rounded-full p-2' aria-label='Toggle theme' />;
  }

  return (
    <button
      onClick={toggleTheme}
      className='bg-surface/80 rounded-full p-2 hover:bg-surface focus:outline-none'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <Sun className='hover:scale-115 h-7 w-7 text-sun' />
      ) : (
        <Moon className='hover:scale-115 h-7 w-7 text-moon' />
      )}
    </button>
  );
};

export default ThemeToggle;
