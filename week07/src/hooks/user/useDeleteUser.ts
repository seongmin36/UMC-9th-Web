import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../../constants/key";

// 유저 탈퇴
export const useDeleteUser = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("정상적으로 탈퇴되었습니다.");
      navigate("/");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.users] });
    },
    onError: (e) => {
      toast.error("탈퇴 처리 중 오류가 발생했습니다.", {
        duration: 2000,
      });
      console.error(e);
    },
  });
};
