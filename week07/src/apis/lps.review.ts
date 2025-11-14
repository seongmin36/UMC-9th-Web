import type { Order } from "../types/common/enum";
import type {
  ResponseCreateReviewDto,
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

export interface PostReviewBody {
  content: string;
}

// 리뷰 작성
export const postReview = async (lpId: number, body: PostReviewBody) => {
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
