import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItem } from "../types/lps/cart";

export interface CartState {
  items: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  items: cartItems,
  amount: 0,
  total: 0,
};

// cartSlice 생성
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.items.find(
        (cartItem: CartItem) => cartItem.id === itemId
      );

      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.items.find(
        (cartItem: CartItem) => cartItem.id === itemId
      );

      if (item) {
        item.amount -= 1;
      }
    },
    remove: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.items = state.items.filter(
        (cartItem: CartItem) => cartItem.id !== itemId
      );
    },
    clearCart: (state: CartState) => {
      state.items = [];
    },
    calculateTotals: (state: CartState) => {
      let amount = 0;
      let total = 0;

      state.items.forEach((item: CartItem) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, remove, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
