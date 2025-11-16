import type {
  RequestCreateLikeDto,
  ResponseCreateLikeDto,
  ResponseDeleteLikeDto,
  RequestDeleteLikeDto,
} from "../types/lps/like";
import { axiosInstance } from "./axios";

// 좋아요 생성
export const postLike = async (
  body: RequestCreateLikeDto
): Promise<ResponseCreateLikeDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseCreateLikeDto>(
      `/v1/lps/${body.lpId}/likes`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 좋아요 삭제
export const deleteLike = async (body: RequestDeleteLikeDto) => {
  try {
    const { data } = await axiosInstance.delete<ResponseDeleteLikeDto>(
      `/v1/lps/${body.lpId}/likes`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
