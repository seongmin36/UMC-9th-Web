import { memo, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [adult, setAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");

  const [, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("영화 제목을 입력해주세요.");
      return;
    }
    setSearchParams({
      query: title,
      include_adult: adult ? "true" : "false",
      language,
      region: "ko-KR",
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAdultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdult(e.target.checked);
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="min-w-180 my-12 flex items-center justify-center rounded-lg px-4 py-2 shadow-md">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          {/* 영화 제목 입력 */}
          <div className="flex flex-col items-center gap-2 flex-1 w-full">
            <span>영화 제목</span>
            <input
              type="text"
              placeholder="영화 제목을 입력하세요."
              className="border-2 border-gray-300 rounded-lg p-2 w-full"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          {/* 옵션 */}
          <div className="flex flex-col items-center gap-2 flex-1 w-full">
            <span>옵션</span>
            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-2 text-[#808080] w-full">
              <input
                type="checkbox"
                name="성인 콘텐츠 표시"
                checked={adult}
                onChange={handleAdultChange}
              />
              <span>성인 콘텐츠 표시</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4 mb-8">
          {/* 언어 */}
          <span>언어</span>
          <select
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
            name="언어"
            id="언어"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </div>
        <button className="bg-[#3D82F5] w-full rounded-md px-6 py-2 text-white cursor-pointer disabled:cursor-not-allowed hover:bg-[#3D82F5]/80 transition-colors duration-200 disabled:bg-gray-300">
          검색하기
        </button>
      </form>
    </div>
  );
};

export default memo(MovieSearch);
