import type { Movie } from '../types/movie';

interface MovieProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieProps) => {
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  return (
    <button className="cursor-pointer">
      <img
        src={`${tmdbBaseUrl}/${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        className="w-full border-none rounded-xl hover:brightness-30 peer-hover:visible transition-colors hover:blur"
      />
    </button>
  );
};

export default MovieItem;
