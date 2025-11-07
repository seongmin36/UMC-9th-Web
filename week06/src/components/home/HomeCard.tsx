import type { Lp } from "../../types/lp";

export const HomeCard = ({ data }: { data: Lp }) => {
  return (
    <img
      src={data.thumbnail}
      alt={data.title}
      className="w-full h-48 object-cover"
      width={100}
      height={100}
    />
  );
};

export default HomeCard;
