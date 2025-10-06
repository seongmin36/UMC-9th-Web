import { useCallback } from "react";

export const useGetLocalStorage = <T>(key: string) => {
  const setTokken = useCallback(
    (values: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(values));
      } catch (e) {
        console.error(e);
      }
    },
    [key]
  );

  const getTokken = useCallback((): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [key]);

  return { setTokken, getTokken };
};
