import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResponseCreateReviewDto } from "../../../types/lps/review";
import { postReview, type PostPatchReviewBody } from "../../../apis/lps.review";
import { QUERY_KEY } from "../../../constants/key";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// 리뷰 작성
export default function usePostReiview(lpId: number) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ResponseCreateReviewDto, Error, PostPatchReviewBody>({
    mutationFn: (body) => postReview(lpId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpReview, lpId] });
      toast.success("리뷰 작성 성공!", { id: "lp-review-create" });
      navigate(`/lp/${lpId}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "리뷰 작성 실패!", {
          id: "lp-review-create",
        });
      } else {
        toast.error(error.message ?? "리뷰 작성 실패!", {
          id: "lp-review-create",
        });
      }
    },
  });
}
