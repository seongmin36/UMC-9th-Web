import type { Order } from "../types/common/enum";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
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
  try {
    const { data } = await axiosInstance.get<ResponseLpListDto>(`/v1/lps`, {
      params: {
        cursor,
        limit,
        search,
        order,
      },
    });
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// LP 상세 조회
export const getLpDetail = async (lpId: number) => {
  try {
    const { data } = await axiosInstance.get<ResponseLpDetailDto>(
      `/v1/lps/${lpId}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
