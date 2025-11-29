import CartItem from "./CartItem";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/lps/redux/useCustomRedux";
import { openModal } from "../../../slices/modalSlice";
import CartDeleteModal from "./CartDeleteModal";

export default function CartList() {
  const { isOpen } = useAppSelector((state) => state.modal);
  const { items, total: totalPrice } = useAppSelector((state) => state.cart);
  const modalDispatch = useAppDispatch();

  const handleClearCart = () => {
    if (!isOpen) {
      modalDispatch(openModal());
      console.log("openModal");
    }
  };

  return (
    <div className="p-14">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="text-2xl font-bold text-end p-4">
        총 결제 금액: {totalPrice}원
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
