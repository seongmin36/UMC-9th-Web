import type { Lp } from "../../../types/lps/lp";

interface ViewSectionProps {
  lp: Lp;
}
export const ViewSection = ({ lp }: ViewSectionProps) => {
  const getThumbnail = (url?: string) => {
    if (!url || !url.trim()) return "/src/assets/image.png";
    return url;
  };
  return (
    <>
      {/* 제목 */}
      <h1 className="text-2xl font-semibold mb-8">{lp?.title}</h1>

      {/* 썸네일 */}
      <div className="w-full flex flex-col items-center mb-8">
        <div className="relative bg-[#282A31] rounded-md shadow-2xl shadow-black mb-3">
          <img
            className="w-80 h-80 object-cover border-2 m-2 border-black rounded-full overflow-hidden"
            src={getThumbnail(lp?.thumbnail)}
            alt="thumbnail"
            onError={(e) => (e.currentTarget.src = "/src/assets/image.png")}
          />
          <div className="absolute inset-[40%] bg-white border border-black rounded-full" />
        </div>
      </div>

      {/* 설명 */}
      {lp?.content && (
        <p className="text-sm leading-relaxed text-gray-200 text-center mb-6">
          {lp.content}
        </p>
      )}

      {/* 태그 */}
      {Array.isArray(lp?.tags) && lp!.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {lp!.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full bg-[#111827] border border-[#1298c5]/40 text-[11px] text-[#1298c5]"
            >
              # {tag.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewSection;
