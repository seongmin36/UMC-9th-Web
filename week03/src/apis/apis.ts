import axios from "axios";

const movieToken = import.meta.env.VITE_MOVIE_API_KEY;

export const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    Authorization: `Bearer ${movieToken}`,
  },
});
