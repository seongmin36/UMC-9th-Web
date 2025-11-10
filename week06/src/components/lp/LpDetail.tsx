import { useGetLpDetail } from "../../hooks/lps/useGetLpDetail";
import { useGetUser } from "../../hooks/user/useGetUser";
import timeAgo from "../../utils/timeFormat";
import { HeartIcon } from "../icons/Heart";
import { Pencil } from "../icons/Pencil";
import { Trash } from "../icons/Trash";

interface LpDetailProps {
  lpId: number;
}

const LpDetail = ({ lpId }: LpDetailProps) => {
  const { data: lp } = useGetLpDetail(lpId);
  const { data: user } = useGetUser();

  const isLiked = lp?.likes.some((like) => like.userId === user?.id);
  const likeCount = lp?.likes.length ?? 0;

  return (
    <div className="min-h-screen text-white bg-black p-8">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16 rounded-md bg-[#282A31]">
        {/* 상단 정보 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* 아바타 */}
            <div className="w-10 h-10 rounded-full bg-[#363636] flex items-center justify-center text-xs font-semibold">
              {lp?.author?.name?.[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {lp?.author?.name ?? "익명"}
              </span>
              <span className="text-xs text-gray-400">
                {timeAgo(lp?.createdAt ?? "")}
              </span>
            </div>
          </div>
          {/* 우측 상단: 시간 / 액션 */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-400">
              {timeAgo(lp?.createdAt ?? "")}
            </span>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-[#1298c5] transition-colors">
                <Pencil />
              </button>
              <button className="hover:text-red-500 transition-colors">
                <Trash />
              </button>
            </div>
          </div>
        </div>
        {/* 제목 */}
        <h1 className="text-2xl font-semibold mb-8">{lp?.title}</h1>
        {/* 아트워크 영역 */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative bg-[#282A31] rounded-md shadow-2xl shadow-black">
            <img
              className="w-80 h-80 object-cover border-2 m-2 border-black rounded-full overflow-hidden"
              src={lp?.thumbnail}
            />
            <div className="absolute inset-[40%] bg-white border border-black rounded-full" />
          </div>
        </div>
        {/* 설명 */}
        {lp?.content && (
          <p className="text-sm leading-relaxed text-gray-200 text-center mb-6">
            {lp?.content}
          </p>
        )}
        {/* 태그 */}
        {Array.isArray(lp?.tags) && lp!.tags?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {lp!.tags?.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full bg-[#111827] border border-[#1298c5]/40 text-[11px] text-[#1298c5]"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
        {/* 좋아요 */}
        <div className="flex items-center justify-center gap-2">
          <button className="flex items-center justify-center">
            <HeartIcon
              width={28}
              height={28}
              className={
                isLiked
                  ? "text-[#ff4b6b]"
                  : "text-[#1298c5] hover:text-[#ff4b6b] transition-colors translate-y-px"
              }
              fill={isLiked ? "#ff4b6b" : "white"}
            />
          </button>
          <span className="text-sm text-gray-200">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetail;
