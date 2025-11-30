import { useCartActions } from "../../../store/useCartStore";
import type { CartItem } from "../../../types/lps/cart";

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { increase, decrease, remove } = useCartActions();

  const handleIncrease = () => {
    increase(item.id);
  };

  const handleDecrease = () => {
    if (item.amount === 1) {
      remove(item.id);
      return;
    }
    decrease(item.id);
  };

  return (
    <li className="flex items-center gap-4 border-b border-gray-200 pb-4">
      <div className="w-20 h-20 rounded-md overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-20 h-20 object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2 flex-1">
        <div className="flex flex-col items-start ">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.singer}</p>
          <p className="text-sm text-gray-500">{item.price}원</p>
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            -
          </button>
          <span>{item.amount}</span>
          <button
            onClick={handleIncrease}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
