import { Order } from "../../types/common/enum";
import { getLpList } from "../../apis/lps";
import { QUERY_KEY } from "../../constants/key";
import { useInfiniteQuery } from "@tanstack/react-query";

// LP 리스트 조회
export const useGetLpList = (order: Order, limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, limit, search: null, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
  });
};
