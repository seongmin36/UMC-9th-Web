import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const movieToken = import.meta.env.VITE_MOVIE_API_KEY;

export const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    Authorization: `Bearer ${movieToken}`,
  },
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});
