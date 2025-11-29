// 장바구니 아이템 타입
export type CartItem = {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
};

// 장바구니 리스트 타입
export type CartList = {
  items: CartItem[];
};
