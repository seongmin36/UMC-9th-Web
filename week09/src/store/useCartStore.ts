import { create } from "zustand";
import type { CartItem } from "../types/lps/cart";
import cartItems from "../constants/cartItems";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

// 카트 액션 타입
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 카트 상태 타입
interface CartState {
  items: CartItem[];
  amount: number;
  total: number;

  actions: CartActions;
}

// 카트 스토어
export const useCartStore = create<CartState>()(
  immer((set) => ({
    items: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.items.find((item: CartItem) => item.id === id);

          if (item) {
            item.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const item = state.items.find((item: CartItem) => item.id === id);

          if (item) {
            item.amount -= 1;
          }
        });
      },
      remove: (id: string) => {
        set((state) => {
          state.items = state.items.filter((item: CartItem) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.items = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.items.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });
          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

// 카트 정보 훅
export const useCartInfo = () => {
  return useCartStore(
    useShallow((state) => ({
      items: state.items,
      amount: state.amount,
      total: state.total,
    }))
  );
};

// 카트 액션 훅
export const useCartActions = () => {
  return useCartStore((state) => state.actions);
};
