import { IoIosArrowBack } from "react-icons/io";
import { useBack } from "../hooks/useBack";
import { type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { postLogin } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import type { UserLoginInformation } from "../utils/validateSchema";
import { useGetLocalStorage } from "../hooks/useGetLocalStorage";
import { AxiosError } from "axios";

const Login = () => {
  const handleBack = useBack("/");
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useLoginForm();
  const navigate = useNavigate();
  const { setTokken } = useGetLocalStorage("accessToken");

  const onSubmit: SubmitHandler<UserLoginInformation> = async (
    data: UserLoginInformation
  ) => {
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
            else if (message.includes("유저를 찾을 수"))
              toast.error("등록되지 않은 이메일입니다.");
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-8 min-h-150"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative flex items-center justify-center text-2xl min-w-90">
        <button onClick={handleBack} className="absolute left-0 cursor-pointer">
          <IoIosArrowBack size={25} />
        </button>
        <p className="font-medium">로그인</p>
      </div>
      <div className="min-w-90">
        <button className="relative flex justify-center text-lg w-full border-2 border-[#50bcdf] font-medium rounded-lg px-4 py-3 cursor-pointer">
          <img
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="google icon"
            className="absolute left-4 w-7"
          />
          <p>구글 로그인</p>
        </button>
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 border-t-2 border-[#636363]" />
          <p className="font-medium text-[#636363]">OR</p>
          <div className="flex-1 border-t-2 border-[#636363]" />
        </div>
        <div className="flex flex-col gap-3">
          <input
            {...register("email")}
            className="text-start border-2 border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors?.email && (
            <div className="pl-2 -mt-3 text-xs text-red-500">
              {errors.email.message}
            </div>
          )}
          <input
            {...register("password")}
            className="border-2 border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
          {errors?.password && (
            <div className="pl-2 -mt-3 text-xs text-red-500">
              {errors.password.message}
            </div>
          )}
          <button
            type="submit"
            disabled={!isValid}
            className="text-white bg-[#50bcdf] rounded-lg px-4 py-3 cursor-pointer hover:bg-[#1298c5] transition-colors disabled:bg-gray-300"
          >
            로그인
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
