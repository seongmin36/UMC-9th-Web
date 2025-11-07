import { IoIosArrowBack } from "react-icons/io";
import { useBack } from "../hooks/common/useBack";
import SignupStep from "../components/SignupStep";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const handleBack = useBack("/");

  return (
    <div className="flex flex-col justify-center items-center min-h-150 gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative min-w-90 flex items-center justify-center text-2xl">
        <button onClick={handleBack} className="absolute left-0 cursor-pointer">
          <IoIosArrowBack size={25} />
        </button>
        <p className="font-medium">회원가입</p>
      </div>
      <SignupStep />
    </div>
  );
};

export default Signup;
