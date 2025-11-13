import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  signupSchema,
  type UserLoginInformation,
  type UserSignupInformation,
} from "../../utils/validateSchema";

export function useLoginForm() {
  return useForm<UserLoginInformation>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldUnregister: false,
  });
}

export function useSignupForm() {
  return useForm<UserSignupInformation>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });
}
