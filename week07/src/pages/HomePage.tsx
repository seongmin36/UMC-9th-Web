import { useState } from "react";
import LpList from "../components/lp/LpList";
import { Order } from "../types/common/enum";
import { OrderToggle } from "../components/common/toggle/OrderToggle";
import { LpModal } from "../components/lp/LpModal";
import ModalPortal from "../components/common/ModalPortal";
import { useAuth } from "../hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [order, setOrder] = useState<Order>(Order.desc);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  // 모달 열기
  const handleOpenModal = () => {
    if (!accessToken) {
      toast.error("로그인이 필요한 서비스입니다!", {
        duration: 2000,
        id: "auth-required",
      });
      navigate("/login", { replace: true });
    }
    setIsOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col items-end justify-start ">
        {/* 정렬 버튼 */}
        <div className="absolute top-12 gap-1 z-10 flex right-30">
          <OrderToggle order={order} onChangeOrder={setOrder} />
        </div>
        {/* LP 리스트 */}
        <LpList order={order} />
        <button
          onClick={handleOpenModal}
          className="fixed bottom-20 right-20 z-50 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        >
          <p className="text-2xl font-bold translate-y-[-1.5px]">+</p>
        </button>
      </div>
      {/* 모달 띄우기 */}
      {isOpen && (
        <ModalPortal>
          <LpModal onClose={handleCloseModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default HomePage;
