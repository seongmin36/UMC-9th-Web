import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-[77px] left-0 h-full w-44 z-20 bg-white border-r border-gray-300 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="flex flex-col p-4 space-y-2 text-gray-700">
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
      </nav>
    </aside>
  );
}
