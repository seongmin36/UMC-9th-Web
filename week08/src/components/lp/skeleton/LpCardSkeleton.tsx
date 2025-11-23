export const LpCardSkeleton = () => {
  console.log("LpCardSkeleton 실행됨");
  return (
    <div className="relative h-48 w-full rounded-md overflow-hidden animate-pulse bg-gray-300">
      {/* 이미지 영역 */}
      <div className="h-full w-full bg-gray-300" />

      {/* 오버레이 효과 (로딩 시 살짝 어둡게) */}
      <div className="absolute inset-0 bg-black/10" />

      {/* 텍스트 영역 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        {/* 제목 */}
        <div className="h-4 w-3/4 bg-gray-400 rounded-md" />
        {/* 날짜 + 좋아요 */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/4 bg-gray-400 rounded-md" />
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-400 rounded-full" />
            <div className="h-3 w-3 bg-gray-400 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
