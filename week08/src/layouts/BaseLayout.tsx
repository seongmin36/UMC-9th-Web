import { Navigate, Outlet, useLocation } from "react-router-dom";
import MovieNavbar from "../components/common/MovieNavbar";
import { useAuth } from "../hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import { useSidebar } from "../hooks/common/sidebar/useSidebar";

interface BaseLayoutProps {
  protectedRoutes: boolean;
}

const BaseLayout = ({ protectedRoutes }: BaseLayoutProps) => {
  const location = useLocation();
  const { accessToken } = useAuth();
  const { isOpen, sidebarRef, triggerRef, close, toggle } = useSidebar();

  useEffect(() => {
    if (protectedRoutes && !accessToken) {
      toast.error("로그인이 필요한 서비스입니다!", { id: "auth-guard" });
    }
  }, [protectedRoutes, accessToken]);

  if (protectedRoutes && !accessToken) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }

  return (
    <>
      {/* 배경 스크롤 방지 */}
      <div
        className={`fixed inset-0 z-10 bg-black transition-opacity duration-300
      ${
        isOpen
          ? "opacity-40 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
      />
      <Sidebar
        isOpen={isOpen}
        sidebarRef={sidebarRef as React.RefObject<HTMLDivElement>}
        onClose={close}
      />
      <MovieNavbar
        triggerRef={triggerRef as React.RefObject<HTMLButtonElement>}
        onToggle={toggle}
      />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-44" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
