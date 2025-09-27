import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import MovieItem from "../../components/MovieItem";
import { useParams } from "react-router-dom";
import MoviePagination from "../../components/MoviePagination";
import Pending from "../../components/common/Pending";
import toast, { Toaster } from "react-hot-toast";
import { getMovies } from "../../apis/movies";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  console.log(movies);

  const movieToken = import.meta.env.VITE_MOVIE_API_KEY;
  useEffect(() => {
    // movieToken 환경 변수 가져오기

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getMovies(category!, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error(e);
        toast.error(`데이터를 불러오는데 실패했습니다!\n${e}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [category, page, movieToken]);

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <Pending />
      ) : (
        <>
          <MoviePagination
            total_pages={totalPages}
            page={page}
            onPageChange={setPage}
          />
          <ul className="grid grid-cols-6 gap-4 mx-40">
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
