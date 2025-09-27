import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../../types/movie";
import axios from "axios";
import MovieItem from "../../components/MovieItem";
import { useParams } from "react-router-dom";
import MoviePagination from "../../components/MoviePagination";
import Pending from "../../components/common/Pending";
import toast, { Toaster } from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(movies);

  useEffect(() => {
    // movieToken 환경 변수 가져오기
    const movieToken = import.meta.env.VITE_MOVIE_API_KEY;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${movieToken}`,
            },
          }
        );
        setMovies(data.results);
      } catch (e) {
        console.log(e);
        toast.error(`데이터를 불러오는데 실패했습니다!\n${e}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [category]);

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <Pending />
      ) : (
        <>
          <MoviePagination />
          <ul className="grid grid-cols-6 gap-4 m-10 mx-40">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieItem movie={movie} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Movies;
