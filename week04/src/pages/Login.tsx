import { IoIosArrowBack } from "react-icons/io";
import { useBack } from "../hooks/useBack";
import useForm from "../hooks/useForm";
import validateSignin from "../utils/validate";
import type { UserLoginInformation } from "../types/userInfo";

const Login = () => {
  const handleBack = useBack("/");
  const { values, touched, error, getInputProps } =
    useForm<UserLoginInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log(values);
  };

  // 오류가 하나라도 없거나, 입력값이 비어있는 경우
  const isDisabled =
    Object.values(error || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-8 min-h-150"
    >
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
            {...getInputProps("email")}
            className="text-start border-2 border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {error?.email && touched?.email && (
            <div className="pl-2 -mt-3 text-xs text-red-500">{error.email}</div>
          )}
          <input
            {...getInputProps("password")}
            className="border-2 border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
          {error?.password && touched?.password && (
            <div className="pl-2 -mt-3 text-xs text-red-500">
              {error.password}
            </div>
          )}
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
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
