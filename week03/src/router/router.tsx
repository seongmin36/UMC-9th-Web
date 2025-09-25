import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import NotFound from '../layouts/NotFount';
import HomePage from '../pages/HomePage';
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
        path: 'movies/:movieId',
        element: <MoviesPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout]);

export default router;
