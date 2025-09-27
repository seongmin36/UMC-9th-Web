import type { MovieDetail, MovieResponse } from "../types/movie";
import { api } from "./apis";

// Movie 조회
export const getMovies = async (category: string, page: number) => {
  const { data } = await api.get<MovieResponse>(
    `/movie/${category}?language=ko-KR&page=${page}`
  );
  return data;
};

// Movie Detail 조회
export const getMovieDetails = async (movieId: number) => {
  const { data } = await api.get<MovieDetail>(
    `/movie/${movieId}?language=ko-KO`
  );
  return data;
};
