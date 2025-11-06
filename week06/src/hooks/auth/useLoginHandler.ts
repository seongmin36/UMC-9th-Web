import { useLocation, useNavigate } from "react-router-dom";
import type { UserLoginInformation } from "../../utils/validateSchema";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuth } from "../auth/useAuth";

export function useLoginSubmit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // location.state로 경로 state를 저장. -> Login성공시 돌아가기
  const from = (location.state as { from?: string })?.from || "/";

  const handleLogin = async (data: UserLoginInformation) => {
    try {
      const res = await toast.promise(login(data), {
        loading: "로그인 중...",
        success: "로그인 성공!",
      });
      console.log("로그인 성공!", res);
      navigate(from, { replace: true });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;
        const message =
          e.response?.data?.message ?? "요청 처리 중 오류가 발생했습니다.";
        switch (status) {
          case 401:
            if (message.includes("비밀번호"))
              toast.error("비밀번호가 일치하지 않습니다.");
            else if (message.includes("유저를 찾을"))
              toast.error("유저를 찾을 수 없습니다.");
            else toast.error(message);
            break;
          case 500:
            toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            break;
          default:
            toast.error(message);
            break;
        }
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
        console.error("Unknown Error:", e);
      }
    }
  };
  return { handleLogin };
}
