import type {
  MovieSearchParams,
  ResponseMovieSearch,
} from "../types/movie.search";
import { api } from "./axios";

// Movie Search 조회
export const getMovieSearch = async (
  params: MovieSearchParams
): Promise<ResponseMovieSearch> => {
  try {
    const { data } = await api.get<ResponseMovieSearch>("/search/movie", {
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
