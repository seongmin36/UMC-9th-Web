import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    // movieToken 환경 변수 가져오기
    const movieToken = import.meta.env.MOVIE_API_KEY;

    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${movieToken}`,
          },
        }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
