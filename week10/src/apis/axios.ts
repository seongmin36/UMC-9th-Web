import axios, { type InternalAxiosRequestConfig } from "axios";
// import { type AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "../utils/localStorage";
import { postRefresh } from "./auth";
// import toast from "react-hot-toast";

// 요청 재시도를 나타내는 retry 플래그
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string | null> | null = null;

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

// 요청 인터셉터 : 요청 전에 매번 최신 토큰을 꺼내서 Authorization 헤더에 저장
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    // AccessToken이 존재하면 Authorization 헤더에 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("AccessToken이 없습니다.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // 응답 인터셉터 : 401 에러 발생 => refreshToken -> accessToken 재발급 -> 요청 재시도 (토큰 갱신)
axiosInstance.interceptors.response.use(
  (response) => response, // 요청 정상 응답
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이면서, 재시도 요청을 하지 않은 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url !== "/v1/auth/refresh") {
        removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
        removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // 이미 refresh 요청이 진행중이면 그 Promise를 재사용
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getLocalStorageItem<string>(
            LOCAL_STORAGE_KEY.refreshToken
          );

          const { data } = await postRefresh(refreshToken as string);
          setLocalStorageItem(LOCAL_STORAGE_KEY.accessToken, data.accessToken);
          setLocalStorageItem(
            LOCAL_STORAGE_KEY.refreshToken,
            data.refreshToken
          );

          return data.accessToken;
        })()
          .catch((error) => {
            console.error(error);
            removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
            removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);

            return null;
          })
          .finally(() => {
            refreshPromise = null;
          });
        // refreshPromise가 들어올때까지 기다림
        const newAccessToken = await refreshPromise;
        if (newAccessToken) {
          // refreshPromise가 들어오면 새로운 accessToken이 Auth 헤더로 Bearer 토큰 전달
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // 업데이트 된 요청을 재시도
          return axiosInstance.request(originalRequest);
        } else {
          return Promise.reject(error);
        }
      }
    }
    // 401 에러가 아닌 경우에 오류를 그대로 반환
    return Promise.reject(error);
  }
);
