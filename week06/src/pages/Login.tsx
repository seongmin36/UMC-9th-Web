import { IoIosArrowBack } from "react-icons/io";
import { useBack } from "../hooks/common/useBack";
import { type SubmitHandler } from "react-hook-form";
import { useLoginForm } from "../hooks/auth/useLoginForm";
import type { UserLoginInformation } from "../utils/validateSchema";
import { useLoginSubmit } from "../hooks/auth/useLoginHandler";
import { useAuthRedirect } from "../hooks/auth/useAuth";
import GoogleLoginButton from "../components/google/GoogleLoginButton";

const Login = () => {
  const handleBack = useBack("/");
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useLoginForm();
  const { handleLogin } = useLoginSubmit();

  // 로그인 상태 확인 리다이렉트
  useAuthRedirect();

  const onSubmit: SubmitHandler<UserLoginInformation> = (data) => {
    handleLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-8 min-h-150"
    >
      <div className="relative flex items-center justify-center text-2xl min-w-90">
        <button onClick={handleBack} className="absolute left-0 cursor-pointer">
          <IoIosArrowBack size={25} />
        </button>
        <p className="font-medium">로그인</p>
      </div>
      <div className="min-w-90">
        <GoogleLoginButton />
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
