import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewList } from "../../apis/lps.review";
import { QUERY_KEY } from "../../constants/key";
import type { Order } from "../../types/common/enum";

export const useGetLpReview = (
  lpId: number,
  cursor: number,
  limit: number,
  order: Order
) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpReview, lpId, cursor, limit, order],
    queryFn: ({ pageParam = cursor }) =>
      getReviewList(lpId, pageParam, limit, order),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    initialPageParam: cursor,
    select: (data) => data.pages.flatMap((page) => page.data.data),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
    enabled: !!lpId,
  });
};
