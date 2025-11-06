import { useEffect, useRef, useState } from "react";
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

  // Race Condition 구현 (AbortController)
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const now = Date.now();
    const cacheData = getToken();

    // race condition 방지를 위해 매번 새로운 AbortController 생성
    abortController.current = new AbortController();

    // 캐시 데이터 확인 및 신선도 검증
    if (cacheData) {
      try {
        const cacheObj: CacheEntry<T> = cacheData as CacheEntry<T>;
        // 신선한 케이스 -> set
        if (now - cacheObj.lastFetched < CACHE_STALE_TIME) {
          setData(cacheObj.data);
          setIsPending(false);
          console.log("새로운 캐시 데이터 사용", url);
          return;
        }
        // 오래된 캐시를 렌더링 하여 UX 향상
        setData(cacheObj.data);
        console.log("만료된 캐시 데이터 사용", url);
      } catch {
        // key(url) 캐시 데이터만 삭제
        removeToken();
      }
    }

    const fetchData = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await fetch(url, {
          signal: abortController.current?.signal,
        });
        if (!response.ok) {
          throw new Error("데이터 fetch 실패");
        }

        const newData = (await response.json()) as T;
        const cacheObj: CacheEntry<T> = {
          data: newData,
          lastFetched: now,
        };
        setToken(cacheObj);
        setData(data);
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          console.error("요청 취소", url);
          return;
        }

        setIsError(true);
        console.error(e);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();

    // useRef 초기화
    return () => {
      abortController.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isPending, isError };
};
