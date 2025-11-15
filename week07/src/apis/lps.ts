import type { Order } from "../types/common/enum";
import type {
  RequestCreateLpDto,
  RequestUpdateLpDto,
  ResponseCreateLpDto,
  ResponseDeleteLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponseUpdateLpDto,
} from "../types/lps/lp";
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

// LP 생성
export const createLp = async (
  body: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseCreateLpDto>(
      `/v1/lps`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// LP 수정
export const updateLp = async (
  lpId: number,
  body: RequestUpdateLpDto
): Promise<ResponseUpdateLpDto> => {
  try {
    const { data } = await axiosInstance.patch<ResponseUpdateLpDto>(
      `/v1/lps/${lpId}`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// LP 삭제
export const deleteLp = async (lpId: number) => {
  try {
    const { data } = await axiosInstance.delete<ResponseDeleteLpDto>(
      `/v1/lps/${lpId}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
