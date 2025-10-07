import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요!")
    .email({ message: "올바른 이메일 형식이 아닙니다!" }),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요!")
    .min(8, "비밀번호는 8자 이상으로 입력해주세요!")
    .max(20, "비밀번호는 20자 이하로 입력해주세요!"),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요!")
      .email({ message: "올바른 이메일 형식이 아닙니다!" }),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요!")
      .min(8, "비밀번호는 8자 이상으로 입력해주세요!")
      .max(20, "비밀번호는 20자 이하로 입력해주세요!"),
    confirmPassword: z.string(),
    name: z.string().nonempty("닉네임을 입력해주세요!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다!",
    path: ["confirmPassword"],
    when(payload) {
      // password와 confirmPassword가 유효할 때만 refine 실행
      return signupSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

// zod가 loginSchema, signupSchema의 타입을 임의로 추정
// UserLoginInformation, UserSignupInformation을 선언하지 않아도 됨.
export type UserLoginInformation = z.infer<typeof loginSchema>;
export type UserSignupInformation = z.infer<typeof signupSchema>;
