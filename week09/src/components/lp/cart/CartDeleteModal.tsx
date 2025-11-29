import useLockBodyScroll from "../../../hooks/common/sidebar/useLockBodyScroll";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/lps/redux/useCustomRedux";
import { clearCart } from "../../../slices/cartSlice";
import { closeModal } from "../../../slices/modalSlice";

const CartDeleteModal = () => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const modalDispatch = useAppDispatch();
  const dispatch = useAppDispatch();

  // 모니터 스크롤 방지
  useLockBodyScroll(isOpen);

  // 장바구니 초기화
  const handleClearCart = () => {
    modalDispatch(closeModal());
    dispatch(clearCart());
  };

  // 모달 닫기
  const handleCloseModal = () => {
    modalDispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative w-[420px] max-w-full rounded-2xl bg-[#282A30] p-8 text-gray-100 shadow-2xl flex flex-col items-center justify-center gap-12">
        <h1 className="text-2xl font-bold">장바구니를 초기화하시겠습니까?</h1>
        <div className="flex justify-center gap-8">
          <button
            onClick={handleClearCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            네
          </button>
          <button
            onClick={handleCloseModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDeleteModal;
