export type MovieSearch = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieSearchParams = {
  query: string;
  include_adult: boolean;
  language: string;
  primary_release_year?: number;
  page?: number;
  region?: string;
  year?: string;
};

export type ResponseMovieSearch = {
  page: number;
  results: MovieSearch[];
  total_pages: number;
  total_results: number;
};
