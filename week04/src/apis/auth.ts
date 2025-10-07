import type {
  ReqeustSignupDto,
  RequestLoginDto,
  ResponseLoginDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

// POST v1/auth/signup
export const postSignup = async (
  body: ReqeustSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post<ResponseSignupDto>(
    `v1/auth/signup`,
    body
  );

  return data;
};

// POST v1.auth/signin
export const postLogin = async (
  body: RequestLoginDto
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post<ResponseLoginDto>(
    `v1/auth/signin`,
    body
  );
  return data;
};
