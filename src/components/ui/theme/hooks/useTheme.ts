import { useThemeContext } from '../providers/ThemeProvider';

const useTheme = () => {
  return useThemeContext();
};

export default useTheme;
