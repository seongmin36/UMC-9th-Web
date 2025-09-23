// context/ThemeContext.ts
import { createContext, useEffect, useState } from 'react';
import type { ThemeContextType } from '../types/theme';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState(() => {
    // localStorage 값이 있으면 사용, 없으면 시스템 설정 따라
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark'); // html class=dark
    } else {
      document.documentElement.classList.remove('dark');
    }
    // localstorage 저장
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
