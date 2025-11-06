import { useEffect, useState } from "react";
import { useGetLocalStorage } from "./useGetLocalStorage";

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

// 로컬 스토리지에 저장할 데이터 구조
const CACHE_STALE_TIME = 5 * 60 * 1000; // 5분

export const useTanstackFetch = <T>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { getToken, removeToken, setToken } = useGetLocalStorage(url);

  useEffect(() => {
    const now = Date.now();
    const cacheData = getToken();

    if (cacheData) {
      try {
        const cacheObj: CacheEntry<T> = cacheData as CacheEntry<T>;
        if (now - cacheObj.lastFetched < CACHE_STALE_TIME) {
          setData(cacheObj.data);
          setIsPending(false);
          return;
        }
      } catch {
        removeToken();
      }
    }

    const fetchData = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("데이터 fetch 실패");
        }

        const data = (await response.json()) as T;
        const cacheObj: CacheEntry<T> = {
          data,
          lastFetched: now,
        };
        setToken(cacheObj);
        setData(data);
      } catch (e) {
        setIsError(true);
        console.error(e);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, getToken, removeToken, setToken]);

  return { data, isPending, isError };
};
