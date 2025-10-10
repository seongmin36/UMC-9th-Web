import { createBrowserRouter, type RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import NotFound from "../layouts/NotFound";
import HomePage from "../pages/HomePage";
import MovieDetail from "../components/movie/MovieDetail";
import Movies from "../pages/movie/Movies";
import MoviesHome from "../pages/movie/MoviesHome";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPagee from "../pages/MyPagee";
import MyPage from "../pages/MyPage";

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
      {
        path: "myPagee",
        element: <MyPagee />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    element: <BaseLayout protectedRoutes={true} />,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout, ...protectedRoutes]);

export default router;
