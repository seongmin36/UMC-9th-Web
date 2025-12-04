import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";

interface MovieProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieProps) => {
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const navigate = useNavigate();
  console.log(movie);

  return (
    <button
      className="cursor-pointer"
      onClick={() => navigate(`/movies/details/${movie.id}`)}
    >
      <div className="relative w-full">
        <img
          src={`${tmdbBaseUrl}${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
          className="w-full h-70 object-cover rounded-xl"
        />
        <div className="absolute inset-0 text-white px-2 bg-black/30 opacity-0 hover:opacity-100 backdrop-blur-sm transition duration-200 rounded-xl flex flex-col items-center justify-center">
          <span className="text-md">{movie.title}</span>
          <span className="w-full text-[11px] opacity-80 mt-2 overflow-hidden line-clamp-3">
            {movie.overview}
          </span>
        </div>
      </div>
    </button>
  );
};

export default MovieItem;
