import { useCallback } from "react";

export const useGetLocalStorage = <T>(key: string) => {
  const setToken = useCallback(
    (values: T) => {
      try {
        // JSON.stringify로 했을 때 문자열 ''가 생겨서 토큰이 한 번 더 감싸짐
        const isString = typeof values === "string";
        console.log(values);
        localStorage.setItem(key, isString ? values : JSON.stringify(values));
      } catch (e) {
        console.error("Error setting localStorage", e);
      }
    },
    [key]
  );

  const getToken = useCallback((): T | null => {
    try {
      const value = localStorage.getItem(key);
      console.log(value);
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
