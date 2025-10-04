import type {
  ResponseMovie,
  ResponseMovieCredits,
  ResponseMovieDetail,
} from "../types/movie";
import { api } from "./apis";

// Movie 조회
export const getMovies = async (category: string, page: number) => {
  const { data } = await api.get<ResponseMovie>(
    `/movie/${category}?language=ko-KR&page=${page}`
  );
  return data;
};

// Movie Detail 조회
export const getMovieDetails = async (movieId: number) => {
  const { data } = await api.get<ResponseMovieDetail>(
    `/movie/${movieId}?language=ko-KO`
  );
  return { data };
};

// Movie Credis 조회
export const getMovieCredits = async (movieId: number) => {
  const { data } = await api.get<ResponseMovieCredits>(
    `/movie/${movieId}/credits?language=ko-KO`
  );
  return { data };
};
