import { useCallback } from "react";

export const useGetLocalStorage = <T>(key: string) => {
  console.log("useGetLocalStorage 호출됨", key); // 이게 여러 번 찍히는지 확인

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
    const value = localStorage.getItem(key);
    console.log("getToken 함수 실행됨", key); // 실제 함수 실행
    if (value === null) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
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
