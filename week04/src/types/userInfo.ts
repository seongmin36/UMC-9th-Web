export type UserLoginInformation = {
  email: string;
  password: string;
};

export type UserSignupInformation = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  avatar?: string;
};
