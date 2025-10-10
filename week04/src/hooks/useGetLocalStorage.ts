import { useCallback } from "react";

export const useGetLocalStorage = <T>(key: string) => {
  const setToken = useCallback(
    (values: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(values));
      } catch (e) {
        console.error(e);
      }
    },
    [key]
  );

  const getToken = useCallback((): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [key]);

  const removeToken = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }, [key]);

  return { setToken, getToken, removeToken };
};
