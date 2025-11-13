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
  try {
    const { data } = await axiosInstance.post<ResponseSignupDto>(
      `v1/auth/signup`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// POST v1/auth/signin
export const postLogin = async (
  body: RequestLoginDto
): Promise<ResponseLoginDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseLoginDto>(
      `v1/auth/signin`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// POST v1/auth/signout
export const postLogout = async () => {
  try {
    const { data } = await axiosInstance.post<ResponseLoginDto>(
      `v1/auth/signout`
    );

    return data;
  } catch (e) {
    console.error(e);
  }
};

// POST v1/auth/refresh
export const postRefresh = async (
  refreshToken: string
): Promise<ResponseLoginDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseLoginDto>(
      `v1/auth/refresh`,
      {
        refresh: refreshToken,
      }
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
