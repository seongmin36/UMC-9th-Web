import type { UserLoginInformation } from "./validateSchema";

function validateUser(values: UserLoginInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 8~20자 사이
  if (values.password.length > 20 || values.password.length < 8) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요!";
  }
  return errors;
}

// 아키텍처 레이어 분리
function validateSignin(values: UserLoginInformation) {
  return validateUser(values);
}

export default validateSignin;
