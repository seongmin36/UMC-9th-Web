import { createBrowserRouter, type RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import NotFound from "../layouts/NotFound";
import HomePage from "../pages/HomePage";
import MovieDetail from "../components/MovieDetail";
import Movies from "../pages/movie/Movies";
import MoviesHome from "../pages/movie/MoviesHome";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const publicLayout: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout protectedRoutes={false} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "movies",
        element: <MoviesHome />,
      },
      {
        path: "movies/:category",
        element: <Movies />,
      },
      {
        path: "movies/details/:movieId",
        element: <MovieDetail />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout]);

export default router;
