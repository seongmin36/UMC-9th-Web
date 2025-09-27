export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface NavItem {
  label: string;
  path: string;
}

export type MovieGenre = {
  id: number;
  name: string;
};

export type Companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export interface MovieDetail extends Movie {
  backdrop_path: string;
  genres: MovieGenre[];
  homepage: string;
  runtime: number;
  status: string;
  tagline: string;
  vote_count: number;
  production_companies: Companies[];
}
