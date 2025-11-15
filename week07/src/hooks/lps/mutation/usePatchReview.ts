import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ResponseDeleteReviewDto,
  ResponsePatchReviewDto,
} from "../../../types/lps/review";
import {
  deleteReview,
  patchReview,
  type PostPatchReviewBody,
} from "../../../apis/lps.review";
import { QUERY_KEY } from "../../../constants/key";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// 리뷰 수정
export function usePatchReview(lpId: number, commentId: number) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ResponsePatchReviewDto, Error, PostPatchReviewBody>({
    mutationFn: (body) => patchReview(lpId, commentId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpReview, lpId] });
      toast.success("리뷰가 수정되었습니다!", { id: "lp-review-update" });
      navigate(`/lp/${lpId}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "리뷰 수정에 실패했습니다!",
          { id: "lp-review-update" }
        );
      } else {
        toast.error(error.message ?? "리뷰 수정에 실패했습니다!", {
          id: "lp-review-update",
        });
      }
    },
  });
}

// 리뷰 삭제
export function useDeleteReview(lpId: number, commentId: number) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ResponseDeleteReviewDto, Error>({
    mutationFn: () => deleteReview(lpId, commentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.lpReview, lpId] });
      toast.success("리뷰가 삭제되었습니다!", { id: "lp-review-delete" });
      navigate(`/lp/${lpId}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "리뷰 삭제에 실패했습니다!",
          { id: "lp-review-delete" }
        );
      } else {
        toast.error(error.message ?? "리뷰 삭제에 실패했습니다!", {
          id: "lp-review-delete",
        });
      }
    },
  });
}
