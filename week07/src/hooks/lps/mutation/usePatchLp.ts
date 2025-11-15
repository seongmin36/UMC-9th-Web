import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type {
  RequestUpdateLpDto,
  ResponseDeleteLpDto,
  ResponseUpdateLpDto,
} from "../../../types/lps/lp";
import { deleteLp, updateLp } from "../../../apis/lps";
import { QUERY_KEY } from "../../../constants/key";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

// LP 수정
export function usePatchLp(lpId: number) {
  const qc = useQueryClient();

  return useMutation<ResponseUpdateLpDto, Error, RequestUpdateLpDto>({
    mutationFn: (body) => updateLp(lpId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
      toast.success("LP 수정 성공", {
        id: "update-lp-success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          id: "update-lp-error",
          duration: 2000,
        });
      } else {
        toast.error(error.message, {
          id: "update-lp-error",
          duration: 2000,
        });
      }
    },
  });
}

// LP 삭제
export function useDeleteLp(lpId: number) {
  const qc = useQueryClient();

  return useMutation<ResponseDeleteLpDto, Error>({
    mutationFn: () => deleteLp(lpId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });
      toast.success("LP 삭제 성공", {
        id: "delete-lp-success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          id: "delete-lp-error",
          duration: 2000,
        });
      } else {
        toast.error(error.message, {
          id: "delete-lp-error",
          duration: 2000,
        });
      }
    },
  });
}
