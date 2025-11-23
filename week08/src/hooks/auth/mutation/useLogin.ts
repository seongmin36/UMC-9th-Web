import toast from "react-hot-toast";
import { useAuth } from "../useAuth";
import { AxiosError } from "axios";
import { postLogin } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLogin() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // location.state로 경로 state를 저장. -> Login성공시 돌아가기
  const from = (location.state as { from?: string })?.from || "/";

  return useMutation({
    mutationFn: postLogin,
    onMutate: () => {
      toast.loading("로그인 중...", { id: "login" });
    },
    onSuccess: ({ data }) => {
      toast.success("로그인 성공!", { id: "login" });
      setToken(data.accessToken, data.refreshToken);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ?? "요청 처리 중 오류가 발생했습니다.";
        switch (status) {
          case 401:
            if (message.includes("비밀번호"))
              toast.error("비밀번호가 일치하지 않습니다.", { id: "login" });
            else if (message.includes("유저를 찾을"))
              toast.error("유저를 찾을 수 없습니다.", { id: "login" });
            else toast.error(message, { id: "login" });
            break;
          case 500:
            toast.error(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              { id: "login" }
            );
            break;
          default:
            toast.error(message, { id: "login" });
            break;
        }
      } else {
        toast.error(error.message ?? "요청 처리 중 오류가 발생했습니다.", {
          id: "login",
        });
      }
    },
  });
}
