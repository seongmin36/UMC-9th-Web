import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      'useDarkMode는 DarkModeProvider 내부에서만 사용해야 합니다.'
    );

  return context;
};
