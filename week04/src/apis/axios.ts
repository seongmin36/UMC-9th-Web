import axios, { type AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { CommonResponse } from "../types/common/common";

const movieToken = import.meta.env.VITE_MOVIE_API_KEY;

export const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    Authorization: `Bearer ${movieToken}`,
  },
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});

// 공통 응답(커스텀 response)처리 인터셉터
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<CommonResponse<T>>) => {
    const data = response.data as CommonResponse<T>;

    // 서버가 준 status=false를 명시적 에러로 던짐(reject)
    if (data && data.status === false) {
      return Promise.reject(data);
    }

    // 정상 처리
    return data as unknown as AxiosResponse<CommonResponse<T>>;
  },
  // 400~500, 네트워크 에러 등 처리
  (error) => {
    return Promise.reject(error);
  }
);
