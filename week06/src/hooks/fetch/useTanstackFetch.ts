import { useEffect, useRef, useState } from "react";
import { useGetLocalStorage } from "../common/useGetLocalStorage";

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

const MAX_RETRIES = 3;
// 1초 딜레이 후 재시도 (총 3번)
const RETRY_DELAY = 1_000;

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

  const retryTimeoutRef = useRef<number | null>(null);

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

    const fetchData = async (currentRetry: number = 0): Promise<void> => {
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
        // 재시도 횟수가 최대 횟수를 초과하지 않았다면 재시도
        if (currentRetry < MAX_RETRIES) {
          // 지수 백오프 재시도 딜레이 계산
          // 지수 백오프 : 재시도 횟수가 증가할수록 딜레이 시간이 2배씩 증가 (기하급수적 증가)
          const retryDelay = RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `재시도 ${
              currentRetry + 1
            }/${MAX_RETRIES} Retrying in ${retryDelay}ms later`
          );
          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
          return;
        } else {
          // 최대 재시도 횟수 초과 시 에러 상태 설정
          setIsError(true);
          setIsPending(false);
          console.error("최대 재시도 횟수 초과", url);
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

      // 예약된 재시도 타이머 취소
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isPending, isError };
};
