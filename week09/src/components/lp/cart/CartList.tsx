import CartItem from "./CartItem";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/lps/redux/useCustomRedux";
import { clearCart } from "../../../slices/cartSlice";

export default function CartList() {
  const { items, total: totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
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
