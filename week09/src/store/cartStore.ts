import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 장바구니 스토어 생성
function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
  return store;
}

// 싱글톤 패턴으로 스토어 내보내기
const store = createStore();

// 타입 추론을 위해 루트 스테이트 타입 정의
export type RootState = ReturnType<typeof store.getState>;
// 디스패치 타입 추론
export type AppDispatch = typeof store.dispatch;

export default store;
