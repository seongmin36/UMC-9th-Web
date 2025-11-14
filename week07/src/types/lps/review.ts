import type { CommonResponse } from "../common/common";
import type { Author } from "./lp";

// 리뷰
export type Review = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

// 리뷰 리스트 데이터 타입
export type ReviewData = {
  data: Review[];
  nextCursor: number | null;
  hasNext: boolean;
};

// 리뷰 리스트 응답 타입
export type ResponseReviewListDto = CommonResponse<ReviewData>;

// 리뷰 작성 응답 타입
export type ResponseCreateReviewDto = CommonResponse<Review>;
