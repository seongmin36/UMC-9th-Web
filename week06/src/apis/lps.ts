import type { Order } from "../types/common/enum";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

interface GetLpListParams {
  cursor: number | null;
  limit: number;
  search: string | null;
  order: Order;
}

// LP 리스트 조회
export const getLpList = async ({
  cursor,
  limit,
  search,
  order,
}: GetLpListParams) => {
  const { data } = await axiosInstance.get<ResponseLpListDto>(`/v1/lps`, {
    params: {
      cursor,
      limit,
      search,
      order,
    },
  });

  return data;
};
