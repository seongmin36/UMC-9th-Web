import type { CommonResponse } from "../common/common";

// 좋아요
export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

// 좋아요 생성 요청 타입
export type RequestCreateLikeDto = {
  lpId: number;
};

// 좋아요 생성 응답 타입
export type ResponseCreateLikeDto = CommonResponse<Like>;

// 좋아요 삭제 요청 타입
export type RequestDeleteLikeDto = {
  lpId: number;
};

// 좋아요 삭제 응답 타입
export type ResponseDeleteLikeDto = CommonResponse<Like>;
