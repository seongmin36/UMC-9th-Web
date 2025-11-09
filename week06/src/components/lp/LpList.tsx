import { useState } from "react";
import { useGetLpList } from "../../hooks/lps/useGetLpList";
import LpCard from "./LpCard";
import { Order } from "../../types/common/enum";
import Loader from "../common/Loading";
import Error from "../common/Error";

const LpList = () => {
  const [order, setOrder] = useState<Order>(Order.desc);
  const { data, isPending, isError } = useGetLpList(order);

  if (isPending) return <Loader />;
  if (isError) return <Error error="Error" />;
  return (
    <>
      <div className="absolute top-30 right-30 gap-2 flex">
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
      {order === Order.asc ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-20 px-30">
          {data?.data?.data.map((item) => (
            <LpCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-20 px-30">
          {data?.data.data.map((item) => (
            <LpCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default LpList;
