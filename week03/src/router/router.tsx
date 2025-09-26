import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import NotFound from '../layouts/NotFount';
import HomePage from '../pages/HomePage';
import MovieDetail from '../components/MovieDetail';
import MoviesPage from '../pages/movie/MoviesPage';

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
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetail />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout]);

export default router;
