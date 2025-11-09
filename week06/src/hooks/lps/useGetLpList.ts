import { useQuery } from "@tanstack/react-query";
import { Order } from "../../types/common/enum";
import { getLpList } from "../../apis/lps";
import { QUERY_KEY } from "../../constants/key";

// LP 리스트 조회
export const useGetLpList = (order: Order) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: () => getLpList({ cursor: 0, limit: 20, search: null, order }),

    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: 1000,
  });

  return { data: data?.data, isPending, isError };
};
