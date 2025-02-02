import { CloudSun, Moon } from 'lucide-react';
import useTheme from './hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='rounded-full p-2 hover:bg-surface focus:outline-none'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <CloudSun
          strokeWidth='1.5'
          className='hover:scale-115 h-7 w-7 text-textPrimary opacity-80'
        />
      ) : (
        <Moon strokeWidth='1.5' className='hover:scale-115 h-7 w-7  text-textPrimary opacity-90' />
      )}
    </button>
  );
};

export default ThemeToggle;
