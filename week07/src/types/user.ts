import type { CommonResponse } from "./common/common";

// User 타입
export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// 리뷰 작성 요청 타입
export type RequestPatchUserDto = {
  name: string;
  bio: string;
  avatar: string;
};

// 리뷰 작성 응답 타입
export type ResponsePatchUserDto = CommonResponse<User>;

// GET v1/users/me
export type ResponseUserDto = CommonResponse<User>;
