import type { Order } from "../types/common/enum";
import type {
  ResponseCreateReviewDto,
  ResponseDeleteReviewDto,
  ResponsePatchReviewDto,
  ResponseReviewListDto,
} from "../types/lps/review";
import { axiosInstance } from "./axios";

// 리뷰 리스트 조회
export const getReviewList = async (
  lpId: number,
  cursor: number,
  limit: number,
  order: Order
) => {
  try {
    const { data } = await axiosInstance.get<ResponseReviewListDto>(
      `/v1/lps/${lpId}/comments`,
      {
        params: {
          cursor,
          limit,
          order,
        },
      }
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export interface PostPatchReviewBody {
  content: string;
}

// 리뷰 작성
export const postReview = async (lpId: number, body: PostPatchReviewBody) => {
  try {
    const { data } = await axiosInstance.post<ResponseCreateReviewDto>(
      `v1/lps/${lpId}/comments`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 리뷰 수정
export const patchReview = async (
  lpId: number,
  commentId: number,
  body: PostPatchReviewBody
) => {
  try {
    const { data } = await axiosInstance.patch<ResponsePatchReviewDto>(
      `v1/lps/${lpId}/comments/${commentId}`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 리뷰 삭제
export const deleteReview = async (lpId: number, commentId: number) => {
  try {
    const { data } = await axiosInstance.delete<ResponseDeleteReviewDto>(
      `v1/lps/${lpId}/comments/${commentId}`
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
