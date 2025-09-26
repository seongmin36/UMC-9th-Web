import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import NotFound from '../layouts/NotFount';
import HomePage from '../pages/HomePage';
import MovieDetail from '../components/MovieDetail';
import MoviesPage from '../pages/movie/MoviesPage';
import MoviesPopular from '../pages/movie/MoviesPopular';
import MoviesNow from '../pages/movie/MoviesNow';
import MoviesTop from '../pages/movie/MoviesTop';
import MoviesUpcoming from '../pages/movie/MoviesUpcoming';

const publicLayout: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout protectedRoutes={false} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies',
        element: <MoviesPage />,
        children: [
          {
            path: 'popular',
            element: <MoviesPopular />,
          },
          {
            path: 'now_playing',
            element: <MoviesNow />,
          },
          {
            path: 'top_rated',
            element: <MoviesTop />,
          },
          {
            path: 'upcoming',
            element: <MoviesUpcoming />,
          },
        ],
      },
      {
        path: 'movies/:catId/:movieId',
        element: <MovieDetail />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout]);

export default router;
