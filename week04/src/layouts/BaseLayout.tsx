import { Navigate, Outlet, useLocation } from "react-router-dom";
import MovieNavbar from "../components/common/MovieNavbar";
import { useAuth } from "../hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface BaseLayoutProps {
  protectedRoutes: boolean;
}

const BaseLayout = ({ protectedRoutes }: BaseLayoutProps) => {
  const location = useLocation();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (protectedRoutes && !accessToken) {
      toast.error("로그인이 필요한 서비스입니다!");
    }
  }, [protectedRoutes, accessToken]);

  if (protectedRoutes && !accessToken) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }

  return (
    <>
      <MovieNavbar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
