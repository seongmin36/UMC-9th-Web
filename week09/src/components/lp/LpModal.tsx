import { useCallback, useEffect, useRef, useState } from "react";
import { XIcon } from "../icons/XIcon";
import useLockBodyScroll from "../../hooks/common/sidebar/useLockBodyScroll";
import { useOnClickOutside } from "../../hooks/common/sidebar/useOnClickOutside";
import usePostLp from "../../hooks/lps/mutation/usePostLp";
import { uploadImage } from "../../apis/img";

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
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string>("");

  // 모달 영역 밖 클릭 시 닫기
  useLockBodyScroll();

  // 모달 영역 밖 클릭 시 닫기
  useOnClickOutside([ModalRef as React.RefObject<HTMLElement>], () => {
    if (onClose) {
      onClose();
    }
  });
  const createLp = usePostLp();

  // 이미지 변경 시 이미지 미리보기
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    // 미리보기용
    setImage(fileUrl);

    // 서버 전송용
    const uploadUrl = await uploadImage(file);
    setImageFile(uploadUrl);
  };

  // 이미지 미리보기 해제 -> 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // LP 생성 버튼 (Add LP)
  const handleCreateLp = () => {
    createLp.mutate({
      title: lpName,
      content: lpContent,
      tags: lpTag,
      thumbnail: imageFile,
      published: false,
    });

    onClose?.(); // 모달 닫기
  };

  // LP 태그 입력 시 엔터키 누르면 추가
  const handleAddLpTag = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!lpTagInput.trim()) return;

      setLpTag((prev) => [...prev, lpTagInput.trim()]);
      setLpTagInput("");
    },
    [lpTagInput]
  );

  // LP 태그 추가 버튼 (Add)
  const handleAddLpTagButton = useCallback(() => {
    if (lpTagInput.trim() === "") return;

    setLpTag((prev) => [...prev, lpTagInput]);
    setLpTagInput("");
  }, [lpTagInput]);

  // LP 태그 삭제 (X)
  const handleRemoveLpTag = useCallback((tag: string) => {
    setLpTag((prev) => prev.filter((t) => t !== tag));
  }, []);

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
                  src={image}
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
              onKeyUp={handleAddLpTag}
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
          onClick={handleCreateLp}
          className="mt-7 h-11 w-full rounded-md bg-blue-500 disabled:bg-[#989FAA] disabled:cursor-not-allowed text-sm font-semibold hover:bg-blue-600 transition-colors"
          disabled={!lpName.trim() || !lpContent.trim()}
        >
          Add LP
        </button>
      </div>
    </div>
  );
}
