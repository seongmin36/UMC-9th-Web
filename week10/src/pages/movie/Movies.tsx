import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MoviePagination from "../../components/movie/MoviePagination";
import Pending from "../../components/common/Pending";
import { Toaster } from "react-hot-toast";
import useCustomFetch from "../../hooks/fetch/useCustomFetch";
import Error from "../../components/common/Error";
import MovieSearch from "../../components/movie/MovieSearch";
import useGetMovieSearch from "../../hooks/movie/query/useGetMovieSearch";
import useMovieSearchFilter from "../../hooks/movie/useMovieSearchFilter";
import MovieList from "../../components/movie/MovieList";

const Movies = () => {
  const { category } = useParams();
  const [page, setPage] = useState<number>(1);

  // 영화 검색 필터
  const { query, include_adult, language } = useMovieSearchFilter();

  const { movies, isLoading, error, totalPages } = useCustomFetch(
    page,
    category
  );

  // 검색어 존재 여부 메모이제이션
  const hasQuery = useMemo(() => query.trim() !== "", [query]);

  // 영화 검색 데이터
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useGetMovieSearch({
    query,
    include_adult,
    language,
  });

  return (
    <div className="flex flex-col items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
      {isLoading ? (
        <Pending />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <MovieSearch />
          {hasQuery ? (
            isSearchLoading ? (
              <Pending />
            ) : searchError ? (
              <Error error={searchError.message} />
            ) : (
              <MovieList movies={searchData?.results ?? []} />
            )
          ) : (
            <MovieList movies={movies} />
          )}
        </>
      )}
      <MoviePagination
        total_pages={totalPages}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Movies;
