import { useCallback } from "react";
import CartItem from "./CartItem";
import CartDeleteModal from "./CartDeleteModal";
import { useCartInfo } from "../../../store/useCartStore";
import { useModalActions, useModalInfo } from "../../../store/useModalStore";

export default function CartList() {
  const { items, total } = useCartInfo();
  const { isOpen } = useModalInfo();
  const { openModal } = useModalActions();

  const handleClearCart = useCallback(() => {
    if (!isOpen) {
      openModal("cart");
    }
  }, [isOpen, openModal]);

  return (
    <div className="p-14">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="text-2xl font-bold text-end p-4">
        총 결제 금액: {total}원
      </div>
      {isOpen && <CartDeleteModal />}
      <div className="flex justify-center p-4">
        <button
          onClick={handleClearCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          장바구니 초기화
        </button>
      </div>
    </div>
  );
}
