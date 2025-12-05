import { memo } from "react";
import MovieItem from "./MovieItem";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className="grid grid-cols-6 gap-4 mx-40">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default memo(MovieList);
