import { Order } from "../../types/common/enum";
import { getLpList } from "../../apis/lps";
import { QUERY_KEY } from "../../constants/key";
import { useInfiniteQuery } from "@tanstack/react-query";

// LP 리스트 조회
export const useGetLpList = (
  order: Order,
  limit: number = 20,
  cursor: number = 0
) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: ({ pageParam = cursor }) =>
      getLpList({ cursor: pageParam, limit, search: null, order }),
    initialPageParam: cursor,
    select: (data) => data.pages.flatMap((page) => page.data.data),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
  });
};
