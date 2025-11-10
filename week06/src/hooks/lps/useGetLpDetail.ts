import { useQuery } from "@tanstack/react-query";
import type { ResponseLpDetailDto } from "../../types/lps/lp";
import { getLpDetail } from "../../apis/lps";

export const useGetLpDetail = (lpId: number) => {
  const { data, isPending, isError } = useQuery<ResponseLpDetailDto>({
    queryKey: ["lp", lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: 1000,
    experimental_prefetchInRender: true,
  });
  return { data: data?.data, isPending, isError };
};
