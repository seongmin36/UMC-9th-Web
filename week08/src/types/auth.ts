import type { CommonResponse } from "./common/common";

export type Login = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export type Signup = {
  id: number;
  name: string;
  email: string;
  bio: null;
  avatar: null;
  createdAt: string;
  updatedAt: string;
};

// Login 요청
export type RequestLoginDto = {
  email: string;
  password: string;
};

// Signup 요청
export type ReqeustSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

// Login 응답
export type ResponseLoginDto = CommonResponse<Login>;
// Signup 응답
export type ResponseSignupDto = CommonResponse<Signup>;
