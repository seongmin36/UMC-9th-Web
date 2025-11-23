/**
 * localStorage를 직접 다루는 유틸리티 함수들
 * React Hook이 아닌 일반 함수이므로 어디서든 사용 가능
 */

export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (e) {
    console.error("Error getting localStorage", e);
    return null;
  }
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    // JSON.stringify로 했을 때 문자열 ''가 생겨서 토큰이 한 번 더 감싸짐
    const isString = typeof value === "string";
    localStorage.setItem(key, isString ? value : JSON.stringify(value));
  } catch (e) {
    console.error("Error setting localStorage", e);
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing localStorage", e);
  }
};






