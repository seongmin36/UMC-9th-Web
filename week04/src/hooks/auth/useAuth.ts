import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
}

export function useAuthRedirect(redirect: string = "/mypagee") {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate(redirect, { replace: true });
    }
  }, [accessToken, navigate]);
}
