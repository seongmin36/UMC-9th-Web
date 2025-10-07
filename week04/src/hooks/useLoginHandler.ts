import { useNavigate } from "react-router-dom";
import { useGetLocalStorage } from "./useGetLocalStorage";
import type { UserLoginInformation } from "../utils/validateSchema";
import toast from "react-hot-toast";
import { postLogin } from "../apis/auth";
import { AxiosError } from "axios";

export function useLoginSubmit() {
  const navigate = useNavigate();
  const { setTokken } = useGetLocalStorage("accessToken");

  const handleLogin = async (data: UserLoginInformation) => {
    try {
      const res = await toast.promise(postLogin(data), {
        loading: "로그인 중...",
        success: "로그인 성공!",
      });
      if (res.data.accessToken) {
        setTokken(res.data.accessToken);
        console.log("토큰 저장 성공", res.data.accessToken);
      }
      console.log("로그인 성공!", res);
      setTimeout(() => navigate("/"), 2000);
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
