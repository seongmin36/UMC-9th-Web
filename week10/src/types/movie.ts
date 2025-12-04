export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

// 영화 리스트 정보
export interface ResponseMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

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

export type Cast = {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  character: string;
};

export type Crew = {
  id: number;
  name: string;
  profile_path: string;
  credit_id: string;
  job: string;
};

// 영화 상세 정보
export interface ResponseMovieDetail extends Movie {
  backdrop_path: string;
  genres: MovieGenre[];
  homepage: string;
  runtime: number;
  status: string;
  tagline: string;
  vote_count: number;
  production_companies: Companies[];
}

// 영화 출연진 정보
export interface ResponseMovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
