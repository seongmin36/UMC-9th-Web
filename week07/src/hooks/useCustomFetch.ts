import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMovies } from "../apis/movies";
import type { Movie } from "../types/movie";

interface MovieFetch {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
}

export default function useCustomFetch(
  page: number,
  category?: string
): MovieFetch {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMovies(category!, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error(e);
        setError("영화 데이터를 불러오는데 실패했습니다!");
        toast.error(`데이터를 불러오는데 실패했습니다!\n${e}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [category, page]);

  return { movies, isLoading, error, totalPages };
}
