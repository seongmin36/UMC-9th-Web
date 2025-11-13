import { useEffect, useRef, useState } from "react";
import { XIcon } from "../icons/XIcon";
import useLockBodyScroll from "../../hooks/common/sidebar/useLockBodyScroll";
import { useOnClickOutside } from "../../hooks/common/sidebar/useOnClickOutside";

interface LpModalProps {
  onClose?: () => void;
}

export function LpModal({ onClose }: LpModalProps) {
  const ModalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [lpName, setLpName] = useState<string>("");
  const [lpContent, setLpContent] = useState<string>("");
  const [lpTag, setLpTag] = useState<string[]>([]);
  const [lpTagInput, setLpTagInput] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // 모달 영역 밖 클릭 시 닫기
  useLockBodyScroll();
  // 모달 영역 밖 클릭 시 닫기
  useOnClickOutside([ModalRef as React.RefObject<HTMLElement>], () => {
    if (onClose) {
      onClose();
    }
  });

  useEffect(() => {
    console.log(lpName, lpContent, lpTag);
  }, [lpName, lpContent, lpTag]);

  const handleAddLp = () => {
    console.log(lpName, lpContent, lpTag);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddLpTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!lpTagInput.trim()) return;
    if (e.key !== "Enter") return;

    setLpTag([...lpTag, lpTagInput]);
    setLpTagInput("");
  };

  const handleAddLpTagButton = () => {
    if (lpTagInput.trim() === "") return;

    setLpTag([...lpTag, lpTagInput]);
    setLpTagInput("");
  };

  const handleRemoveLpTag = (tag: string) => {
    setLpTag(lpTag.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* 모달 카드 */}
      <div
        ref={ModalRef}
        className="relative w-[420px] max-w-full rounded-2xl bg-[#282A30] px-8 pb-8 pt-6 text-gray-100 shadow-2xl"
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-100 hover:bg-white/5 hover:text-white"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {/* LP 이미지 영역 */}
        <div className="relative flex flex-col items-center pt-6 pb-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex items-center gap-[-20px]">
            {image && (
              <div className="w-55 h-55 object-cover overflow-hidden -mr-18 z-5">
                <img
                  src={URL.createObjectURL(image)}
                  alt="LP"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="h-44 w-44 cursor-pointer overflow-hidden rounded-full bg-black shadow-lg"
            >
              <img
                src="/src/assets/image.png"
                alt="LP"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 입력 폼 영역 */}
        <div className="space-y-4">
          {/* LP Name */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="LP Name"
              className="h-11 w-full rounded-md border border-white/30 bg-[#25272C] px-3 text-sm text-gray-100 placeholder:text-gray-400 focus:border-white/50 focus:outline-none"
              value={lpName}
              onChange={(e) => setLpName(e.target.value)}
            />
          </div>

          {/* LP Content */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="LP Content"
              className="h-11 w-full rounded-md border border-white/30 bg-[#25272C] px-3 text-sm text-gray-100 placeholder:text-gray-400 focus:border-white/50 focus:outline-none"
              value={lpContent}
              onChange={(e) => setLpContent(e.target.value)}
            />
          </div>

          {/* LP Tag + Add 버튼 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              className="h-11 flex-1 rounded-md border border-white/30 bg-[#25272C] px-3 text-sm text-gray-100 placeholder:text-gray-400 focus:border-white/50 focus:outline-none"
              value={lpTagInput}
              onChange={(e) => setLpTagInput(e.target.value)}
              onKeyDown={handleAddLpTag}
            />
            <button
              type="button"
              className="h-11 rounded-md bg-blue-500 disabled:bg-[#989FAA] disabled:cursor-not-allowed px-5 text-sm font-medium hover:bg-blue-600 transition-colors"
              onClick={handleAddLpTagButton}
              disabled={!lpTagInput.trim()}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 ">
            {lpTag.map((tag, i) => (
              <div
                className="flex items-center jusity-between gap-2 border rounded-md px-2 py-1"
                key={i}
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveLpTag(tag)}
                  type="button"
                  className="text-sm text-gray-100"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 Add LP 버튼 */}
        <button
          type="button"
          onClick={handleAddLp}
          className="mt-7 h-11 w-full rounded-md bg-blue-500 disabled:bg-[#989FAA] disabled:cursor-not-allowed text-sm font-semibold hover:bg-blue-600 transition-colors"
          disabled={!lpName.trim() || !lpContent.trim()}
        >
          Add LP
        </button>
      </div>
    </div>
  );
}
