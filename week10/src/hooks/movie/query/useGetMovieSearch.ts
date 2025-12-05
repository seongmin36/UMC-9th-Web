import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/key";
import { getMovieSearch } from "../../../apis/movies.search";
import type {
  MovieSearchParams,
  ResponseMovieSearch,
} from "../../../types/movie.search";

export default function useGetMovieSearch(params: MovieSearchParams) {
  return useQuery<ResponseMovieSearch, Error>({
    queryKey: [QUERY_KEY.movieSearch, params],
    queryFn: () => getMovieSearch(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
    enabled: !!params.query,
  });
}
