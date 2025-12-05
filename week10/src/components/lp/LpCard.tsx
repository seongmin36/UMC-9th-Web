import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lps/lp";
import timeAgo from "../../utils/timeFormat";
import { HeartIcon } from "../icons/Heart";

const LpCard = ({ data }: { data: Lp }) => {
  const navigate = useNavigate();

  // 시간 계산 메모이제이션
  const formattedTime = useMemo(() => timeAgo(data.createdAt), [data.createdAt]);
  const likeCount = useMemo(() => data.likes?.length ?? 0, [data.likes]);

  const handleClick = useCallback(() => {
    navigate(`/lp/${data.id}`);
  }, [navigate, data.id]);

  return (
    <div
      className="hover:scale-120 group hover:z-10 relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/src/assets/image.png")}
          width={100}
          height={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex text-white flex-col justify-end gap-1 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-sm font-semibold line-clamp-2 mr-4">
            {data.title}
          </h3>
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs">{formattedTime}</p>
            {/* 좋아요 섹션 */}
            <div className="flex items-center justify-center">
              <HeartIcon
                color="white"
                width={18}
                height={18}
                className="translate-y-0.5"
              />
              <p className="text-sm">{likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LpCard);
