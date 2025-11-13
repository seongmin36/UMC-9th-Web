import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/key";
import type {
  RequestCreateLpDto,
  ResponseCreateLpDto,
} from "../../../types/lps/lp";
import { createLp } from "../../../apis/lps";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function useCreateLp() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
    mutationFn: (body) => createLp(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      toast.success("LP 생성 성공!", { duration: 2000 });
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 3000 });
      } else {
        toast.error(error.message, { duration: 3000 });
      }
      navigate("/");
    },
  });
}
