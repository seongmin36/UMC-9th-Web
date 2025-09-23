import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      className="fixed top-5 right-10 bg-amber-50 dark:bg-[#363636] dark:text-white"
      onClick={toggleTheme}
    >
      {isDark ? <Moon fill="white" /> : <Sun />}
    </button>
  );
};
