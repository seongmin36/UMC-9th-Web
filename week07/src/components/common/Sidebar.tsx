import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import toast from "react-hot-toast";

interface SidebarProps {
  isOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

export default function Sidebar({ isOpen, sidebarRef, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path, { replace: true });
    onClose();
  };

  // 창 크기 변경 시 자동 닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) onClose();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  const deleteUser = useDeleteUser();
  const handleDeleteUser = () => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      toast.promise(
        async () => await deleteUser.mutate(),
        {
          loading: "탈퇴 중...",
          success: "탈퇴 성공!",
          error: "탈퇴 실패!",
        },
        { id: "user-delete" }
      );
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-[77px] left-0 h-full w-44 z-20 bg-white border-r border-gray-300 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="flex flex-col p-4 space-y-2 min-h-screen text-gray-700">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleNavigate("/search")}
            className="text-left hover:text-blue-500 transition"
          >
            찾기
          </button>
          <button
            onClick={() => handleNavigate("/mypage")}
            className="text-left hover:text-blue-500 transition"
          >
            마이페이지
          </button>
        </div>
        <button
          className="hover:text-red-500 transition mt-180"
          onClick={handleDeleteUser}
        >
          탈퇴하기
        </button>
      </nav>
    </aside>
  );
}
