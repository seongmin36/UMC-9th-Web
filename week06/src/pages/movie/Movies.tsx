import { useState } from "react";
import MovieItem from "../../components/movie/MovieItem";
import { useParams } from "react-router-dom";
import MoviePagination from "../../components/movie/MoviePagination";
import Pending from "../../components/common/Pending";
import { Toaster } from "react-hot-toast";
import useCustomFetch from "../../hooks/useCustomFetch";
import Error from "../../components/common/Error";

const Movies = () => {
  const { category } = useParams();
  const [page, setPage] = useState<number>(1);

  const { movies, isLoading, error, totalPages } = useCustomFetch(
    page,
    category
  );

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <Pending />
      ) : error ? (
        <Error error={error} />
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
