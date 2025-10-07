import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import User from "../assets/user.svg";
import { useFormState, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postSignup } from "../apis/auth";
import { useSignupForm } from "../hooks/useLoginForm";
import type { UserSignupInformation } from "../utils/validateSchema";

const SignupStep = () => {
  const [passwordVisible, setPasswordVisible] = useState({
    password: true,
    confirmPassword: true,
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<UserSignupInformation>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isValid },
  } = useSignupForm();

  const { errors: formErrors, dirtyFields } = useFormState({
    control,
    name: ["email", "password", "confirmPassword", "name"],
  });

  const onSubmit: SubmitHandler<UserSignupInformation> = async (
    data: UserSignupInformation
  ) => {
    try {
      const res = await toast.promise(postSignup(data), {
        loading: "회원가입 중...",
        success: "회원가입 성공!",
        error: "회원가입 실패!",
      });
      console.log("회원가입 성공", res);
      setTimeout(() => navigate("/"), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePasswordVisible = (toggle: "password" | "confirmPassword") => {
    setPasswordVisible((prev) => ({
      ...prev,
      [toggle]: !prev[toggle],
    }));
  };

  const handleNextStep = () => {
    const current = getValues();
    setData(current);
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  console.log(getValues().password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-90">
      {step === 1 && (
        <div className="flex flex-col gap-3">
          <button className="relative flex justify-center text-lg w-full border-2 border-[#50bcdf] font-medium rounded-lg px-4 py-3 cursor-pointer">
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google icon"
              className="absolute left-4 w-7"
            />
            <p>구글 로그인</p>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t-2 border-[#636363]" />
            <p className="font-medium text-[#636363]">OR</p>
            <div className="flex-1 border-t-2 border-[#636363]" />
          </div>
          <input
            {...register("email")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleNextStep();
              }
            }}
            className="text-start border-2 border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors.email && (
            <div className="pl-2 -mt-3 text-xs text-red-500">
              {errors.email.message}
            </div>
          )}
          <button
            type="button"
            disabled={!!formErrors.email || !dirtyFields.email}
            onClick={handleNextStep}
            className="text-white bg-[#50bcdf] rounded-lg px-4 py-3 cursor-pointer hover:bg-[#1298c5] transition-colors disabled:bg-gray-300"
          >
            다음
          </button>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {/* Step 2 */}
        {step === 2 && (
          <>
            <span className="flex items-center justify-start gap-2">
              <CiMail size={20} />
              <p>{data?.email}</p>
            </span>
            <div className="relative">
              <input
                {...register("password")}
                className="border-2 w-full border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
                type={passwordVisible.password ? "password" : "text"}
                placeholder="비밀번호를 입력해주세요!"
              />
              <button
                onClick={() => handlePasswordVisible("password")}
                className="absolute right-4 top-4"
              >
                {passwordVisible.password ? (
                  <RiEyeCloseLine size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
            {errors?.password && (
              <div className="pl-2 -mt-3 text-xs text-red-500">
                {errors.password.message}
              </div>
            )}
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다!",
                })}
                onKeyDown={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="border-2 w-full border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
                type={passwordVisible.confirmPassword ? "password" : "text"}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
              />
              <button
                onClick={() => handlePasswordVisible("confirmPassword")}
                className="absolute right-4 top-4"
              >
                {passwordVisible.confirmPassword ? (
                  <RiEyeCloseLine size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
            {errors?.confirmPassword && (
              <div className="pl-2 -mt-3 text-xs text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
            <button
              disabled={
                !!formErrors.password ||
                !!formErrors.confirmPassword ||
                !dirtyFields.password ||
                !dirtyFields.confirmPassword
              }
              onClick={() => setStep(3)}
              className="text-white bg-[#50bcdf] rounded-lg px-4 py-3 cursor-pointer hover:bg-[#1298c5] transition-colors disabled:bg-gray-300"
            >
              다음
            </button>
          </>
        )}
        {/* Step 3 */}
        {step === 3 && (
          <>
            <div className="flex items-center justify-center w-full">
              <img src={User} alt="user" className="w-55 h-55" />
            </div>
            <input
              {...register("name")}
              className="border-2 w-full border-[#50bcdf] rounded-lg px-4 py-3 focus:outline-[#1298c5]"
              type="text"
              placeholder="닉네임을 입력해주세요!"
            />
            {errors?.name && (
              <p className="pl-2 -mt-3 text-xs text-red-500 align-middle">
                {errors.name.message}
              </p>
            )}
            <button
              disabled={!isValid}
              type="submit"
              className="text-white w-full bg-[#50bcdf] rounded-lg px-4 py-3 cursor-pointer hover:bg-[#1298c5] transition-colors disabled:bg-gray-300"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignupStep;
