import type { UserLoginInformation } from "../../utils/validateSchema";
import useLogin from "./mutation/useLogin";

export function useLoginSubmit() {
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (data: UserLoginInformation) => {
    login(data);
  };
  return { handleLogin, isPending };
}
