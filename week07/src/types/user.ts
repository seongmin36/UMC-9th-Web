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

// GET v1/users/me
export type ResponseUserDto = CommonResponse<User>;
