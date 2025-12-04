import { createBrowserRouter, type RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import NotFound from "../layouts/NotFound";
import HomePage from "../pages/HomePage";
import MovieDetail from "../components/movie/MovieDetail";
import Movies from "../pages/movie/Movies";
import MoviesHome from "../pages/movie/MoviesHome";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import GoogleLoginRedirect from "../components/google/GoogleCallback";
import LpDetailPage from "../pages/lp/LpDetailPage";
import LpShoppingPage from "../pages/lp/LpShoppingPage";

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
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirect />,
      },
      {
        path: "cart",
        element: <LpShoppingPage />,
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
      {
        path: "lp/:lpId",
        element: <LpDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicLayout, ...protectedRoutes]);

export default router;
