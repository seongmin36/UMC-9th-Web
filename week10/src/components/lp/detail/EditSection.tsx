import { useCallback } from "react";

interface EditSectionProps {
  title: string;
  setTitle: (title: string) => void;
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
  content: string;
  setContent: (content: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  tagInput: string;
  setTagInput: (tagInput: string) => void;
}

export default function EditSection({
  title,
  setTitle,
  thumbnail,
  setThumbnail,
  content,
  setContent,
  setTags,
  tagInput,
  setTagInput,
}: EditSectionProps) {
  // 태그 인풋 변경 시 태그 배열 동기화
  const handleTagChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // 1. 사용자가 친 문자열 그대로 유지
      setTagInput(value);

      // 2. 이 문자열을 기반으로 태그 배열만 계산
      const parsed = value
        .split("#")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      setTags(parsed);
    },
    [setTagInput, setTags]
  );

  return (
    <>
      {/* 제목 인풋 */}
      <input
        type="text"
        className="w-full text-2xl font-semibold mb-6 bg-transparent border-b border-neutral-600 focus:outline-none focus:border-[#1298c5] p-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />

      {/* 아트워크 + 썸네일 URL 인풋 */}
      <div className="w-full flex flex-col items-center mb-8">
        <div className="relative bg-[#282A31] rounded-md shadow-2xl shadow-black mb-15">
          <img
            className="w-80 h-80 border-2 m-2 border-black rounded-full overflow-hidden object-cover"
            src={thumbnail ? thumbnail : "/src/assets/image.png"}
            alt="thumbnail"
            onError={(e) => {
              e.currentTarget.src = "/src/assets/image.png";
              e.currentTarget.alt = "thumbnail";
            }}
          />
          <div className="absolute inset-[40%] bg-white border border-black rounded-full" />
        </div>
        <input
          type="text"
          className="w-full max-w-xs p-2 rounded-md border border-neutral-600 text-neutral-100 bg-neutral-800 text-xs"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="썸네일 이미지 URL"
        />
      </div>

      {/* 설명 인풋 */}
      <textarea
        className="w-full text-sm leading-relaxed text-gray-200 text-start mb-6 bg-neutral-800 border border-neutral-600 rounded-md p-3 resize-none"
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />

      {/* 태그 인풋 */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <input
          type="text"
          className="w-full max-w-md p-2 rounded-md border border-neutral-600 text-neutral-100 bg-neutral-800 text-xs"
          value={tagInput}
          onChange={handleTagChange}
          placeholder="해시태그(#)를 넣어주세요"
        />
      </div>
    </>
  );
}
