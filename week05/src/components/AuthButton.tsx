import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

const AuthButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(`/`);
    window.location.reload();
  };

  if (accessToken) {
    return (
      <>
        <button
          onClick={handleLogout}
          className="rounded-md text-sm text-[#1298c5] text-center w-24 py-2 cursor-pointer hover:text-[#52b0d0] hover:underline"
        >
          로그아웃
        </button>
        <button
          onClick={() => navigate("/mypage")}
          className="bg-[#1298c5] rounded-md text-sm text-white text-center w-24 py-2.5 cursor-pointer hover:bg-[#52b0d0]"
        >
          마이페이지
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          navigate(`/login`, { state: { from: location.pathname } })
        }
        className="bg-[#1298c5] rounded-md text-sm text-white text-center w-20 py-2.5 cursor-pointer hover:bg-[#52b0d0]"
      >
        로그인
      </button>
      <button
        onClick={() =>
          navigate(`/signup`, { state: { from: location.pathname } })
        }
        className="border-2 rounded-md text-sm text-[#1298c5] text-center w-20 py-2 cursor-pointer"
      >
        회원가입
      </button>
    </>
  );
};

export default AuthButton;
