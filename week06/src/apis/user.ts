import type { ResponseUserDto } from "../types/user";
import { axiosInstance } from "./axios";

// GET v1/users/me
export const getUser = async () => {
  try {
    const { data } = await axiosInstance.get<ResponseUserDto>(`v1/users/me`);
    return data;
  } catch (e) {
    console.error(e);
  }
};
