import { useGetLpList } from "../../hooks/lps/useGetLpList";
import HomeCard from "./HomeCard";

const HomeList = () => {
  const { data, isPending, isError } = useGetLpList();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-20 px-30">
        {data?.data.data.map((item) => (
          <HomeCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default HomeList;
