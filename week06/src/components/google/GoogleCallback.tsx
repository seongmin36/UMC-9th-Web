import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useAuth } from "../../hooks/auth/useAuth";

const GoogleLoginRedirect = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = params.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      // AuthContext와 localStorage 업데이트
      setToken(accessToken, refreshToken || undefined);
      const redirectPath =
        localStorage.getItem(LOCAL_STORAGE_KEY.redirectPath) ?? "/mypage";
      localStorage.removeItem(LOCAL_STORAGE_KEY.redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [setToken, navigate]);

  return <div>구글 로그인</div>;
};

export default GoogleLoginRedirect;
