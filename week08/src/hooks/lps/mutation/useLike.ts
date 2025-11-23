import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike, postLike } from "../../../apis/lps.like";
import { QUERY_KEY } from "../../../constants/key";
import type {
  Like,
  RequestCreateLikeDto,
  RequestDeleteLikeDto,
} from "../../../types/lps/like";
import type { ResponseLpDetailDto } from "../../../types/lps/lp";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// 좋아요 생성
export const usePostLike = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp: RequestCreateLikeDto) => {
      // 이전 데이터 취소
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lp.lpId] });

      // 이전 데이터 조회
      const previousLpDetail = qc.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lpDetail,
        lp.lpId,
      ]);

      // 이전 데이터 깊은 복사
      const newLpDetail = structuredClone(previousLpDetail);

      // 현재 사용자 조회
      const me = qc.getQueryData<ResponseLpDetailDto>([QUERY_KEY.users]);
      const userId = Number(me?.data.id);

      const likedIndex =
        newLpDetail?.data.likes?.findIndex((like) => like.userId === userId) ??
        -1;
      if (likedIndex >= 0) {
        // 좋아요 삭제 (이전 데이터에서 좋아요 삭제) splice 메서드를 사용하여 좋아요 삭제
        newLpDetail?.data.likes?.splice(likedIndex, 1);
      } else {
        // 좋아요 추가 (새로운 좋아요 객체 생성) 생성된 좋아요 객체를 이전 데이터에 추가
        const newLike = {
          userId: userId,
          lpId: lp.lpId,
        } as Like;
        newLpDetail?.data.likes?.push(newLike);
      }

      // 이전 데이터 업데이트
      qc.setQueryData([QUERY_KEY.lpDetail, lp.lpId], newLpDetail);

      return { previousLpDetail };
    },

    // variables: 요청 변수
    // context: onMutate 결과 반환 값
    onError: (error, variables, context) => {
      // 이전 데이터 복구
      if (context?.previousLpDetail) {
        qc.setQueryData(
          [QUERY_KEY.lpDetail, variables.lpId],
          context.previousLpDetail
        );
      }
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          id: "like-error",
        });
      }
    },
    // data: 요청 성공 시 반환 값
    onSettled: async (_, error, variables) => {
      if (error) {
        return;
      }
      await qc.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, variables.lpId],
      });
    },
  });
};

// 좋아요 삭제
export const useDeleteLike = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLike,
    onMutate: async (lp: RequestDeleteLikeDto) => {
      // 이전 데이터 취소
      await qc.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lp.lpId] });

      // 이전 데이터 조회
      const previousLpDetail = qc.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lpDetail,
        lp.lpId,
      ]);

      // 이전 데이터 복사
      const newLpDetail = structuredClone(previousLpDetail);

      const me = qc.getQueryData<ResponseLpDetailDto>([QUERY_KEY.users]);
      const userId = Number(me?.data.id);

      const likedIndex =
        newLpDetail?.data.likes?.findIndex((like) => like.userId === userId) ??
        -1;
      if (likedIndex >= 0) {
        // 좋아요 삭제 (이전 데이터에서 좋아요 삭제) splice 메서드를 사용하여 좋아요 삭제
        newLpDetail?.data.likes?.splice(likedIndex, 1);
      } else {
        // 좋아요 추가 (새로운 좋아요 객체 생성) 생성된 좋아요 객체를 이전 데이터에 추가
        const newLike = {
          userId: userId,
          lpId: lp.lpId,
        } as Like;
        newLpDetail?.data.likes?.push(newLike);
      }

      // 이전 데이터 업데이트
      qc.setQueryData([QUERY_KEY.lpDetail, lp.lpId], newLpDetail);

      return { previousLpDetail };
    },
    onError: (error, variables, context) => {
      // 이전 데이터 복구
      if (context?.previousLpDetail) {
        qc.setQueryData(
          [QUERY_KEY.lpDetail, variables.lpId],
          context.previousLpDetail
        );
      }
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          id: "like-error",
        });
      }
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        return;
      }
      await qc.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, variables.lpId],
      });
    },
  });
};
