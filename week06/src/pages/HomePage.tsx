import { useState } from "react";
import LpList from "../components/lp/LpList";
import { Order } from "../types/common/enum";

const HomePage = () => {
  const [order, setOrder] = useState<Order>(Order.desc);

  return (
    <>
      <div className="relative flex flex-col items-end justify-start ">
        {/* 정렬 버튼 */}
        <div className="absolute top-12 gap-1 flex right-30">
          <button
            value={Order.asc}
            onClick={() => setOrder(Order.asc)}
            className={`cursor-pointer ${
              order === Order.asc ? "text-blue-500" : "text-black"
            }`}
          >
            최신순
          </button>
          <button
            value={Order.desc}
            onClick={() => setOrder(Order.desc)}
            className={`cursor-pointer ${
              order === Order.desc ? "text-blue-500" : "text-black"
            }`}
          >
            오래된순
          </button>
        </div>
        {/* LP 리스트 */}
        <LpList order={order} />
      </div>
    </>
  );
};

export default HomePage;
