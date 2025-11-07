import { useQuery } from "@tanstack/react-query";
import { Order } from "../../types/common/enum";
import { getLpList } from "../../apis/lps";

// LP 리스트 조회
export const useGetLpList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["lps"],
    queryFn: () =>
      getLpList({ cursor: 0, limit: 20, search: null, order: Order.desc }),

    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: 1000,
  });

  return { data, isPending, isError };
};
