import type { CommonResponse } from "./../types/common/common";
import { axiosInstance } from "./axios";

// 이미지 업로드 응답 타입
interface ResponseUploadImageDto extends CommonResponse<{ imageUrl: string }> {
  data: { imageUrl: string };
}

// 이미지 업로드
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await axiosInstance.post<ResponseUploadImageDto>(
      "/v1/uploads",
      formData
    );
    return data.data.imageUrl;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
