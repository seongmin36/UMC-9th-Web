import { useState } from "react";
import LpList from "../components/lp/LpList";
import { Order } from "../types/common/enum";
import { OrderToggle } from "../components/common/toggle/OrderToggle";

const HomePage = () => {
  const [order, setOrder] = useState<Order>(Order.desc);

  return (
    <>
      <div className="relative flex flex-col items-end justify-start ">
        {/* 정렬 버튼 */}
        <div className="absolute top-12 gap-1 flex right-30">
          <OrderToggle order={order} onChangeOrder={setOrder} />
        </div>
        {/* LP 리스트 */}
        <LpList order={order} />
      </div>
    </>
  );
};

export default HomePage;
