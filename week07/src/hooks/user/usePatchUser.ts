import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../apis/user";
import { QUERY_KEY } from "../../constants/key";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type {
  RequestPatchUserDto,
  ResponsePatchUserDto,
} from "../../types/user";

export const usePatchUser = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ResponsePatchUserDto, Error, RequestPatchUserDto>({
    mutationFn: (body) => patchUser(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.users] });
      toast.success("유저 정보가 수정되었습니다!", { duration: 2000 });
      navigate("/mypage");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "유저 정보 수정에 실패했습니다!",
          { duration: 2000 }
        );
      } else {
        toast.error(error.message ?? "유저 정보 수정에 실패했습니다!", {
          duration: 2000,
        });
      }
    },
  });
};
