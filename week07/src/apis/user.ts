import type {
  RequestPatchUserDto,
  ResponsePatchUserDto,
  ResponseUserDto,
} from "../types/user";
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

// 유저 정보 수정
export const patchUser = async (
  body: RequestPatchUserDto
): Promise<ResponsePatchUserDto> => {
  try {
    const { data } = await axiosInstance.patch<ResponsePatchUserDto>(
      `v1/users`,
      body
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
