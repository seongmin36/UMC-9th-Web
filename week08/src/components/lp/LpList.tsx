import LpCard from "./LpCard";
import { LpCardSkeleton } from "./skeleton/LpCardSkeleton";
import { Order } from "../../types/common/enum";
import useGetLpList from "../../hooks/lps/query/useGetLpList";
import { useOnInView } from "react-intersection-observer";
import Error from "../common/Error";
import { useSearchStore } from "../../store/useSearchStore";
import useDebounce from "../../hooks/common/useDebounce";
import toast from "react-hot-toast";

const LpList = ({ order }: { order: Order }) => {
  // 검색어 상태 관리
  const { search, searchQuery, isSearchOpen, setSearch, setSearchQuery } =
    useSearchStore();
  const debouncedSearch = useDebounce(search?.trim() ?? null, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    isPending,
  } = useGetLpList(order, 20, 0, isSearchOpen ? searchQuery : null);

  // 무한 스크롤 추적
  const trackingRef = useOnInView((inView, entry) => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("요소가 보여집니다.", entry.target);
      fetchNextPage();
    }
  });

  // 검색 핸들러
  const handleSearch = () => {
    if (!debouncedSearch || debouncedSearch === "") {
      setSearchQuery(null);
      toast.error("검색어를 입력해주세요.", {
        duration: 2000,
        id: "search-error",
      });
      return;
    }
    setSearchQuery(debouncedSearch);
  };

  // 엔터키 핸들러
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 데이터 리스트가 있는지 확인
  const hasData = Boolean(data && data.length > 0);
  // 초기 스켈레톤 표시 여부 결정
  const showInitialSkeleton = isPending || (!hasData && isFetching);

  if (isError) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했어요.";
    return <Error error={message} />;
  }

  return (
    <>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center gap-2 py-4 px-30 text-xs text-neutral-500 ">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="
        w-full px-3 py-2 
        rounded-md 
        border border-neutral-300 
        text-neutral-700
        placeholder:text-neutral-400
        focus:outline-none focus:ring-1 focus:ring-neutral-400
      "
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyUp}
          />

          <button
            type="button"
            onClick={handleSearch}
            className="
        w-1/8
        rounded-md 
        px-3 py-2 
        bg-neutral-800 
        text-neutral-100 
        text-xs
        hover:bg-neutral-700 
        transition-colors cursor-pointer
      "
          >
            검색
          </button>
        </div>
      )}
      {/* 초기 스켈레톤 표시 */}
      <div className="relative grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-20 px-30 mt-10">
        {/* 초기 스켈레톤 표시 */}
        {showInitialSkeleton && !hasData
          ? Array.from({ length: 10 }).map((_, index) => (
              <LpCardSkeleton key={index} />
            ))
          : data?.map((item) => <LpCard key={item.id} data={item} />)}
        {/* 다음 페이지 스켈레톤 표시 */}
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <LpCardSkeleton key={index} />
          ))}
      </div>
      <div ref={trackingRef} className="h-4 w-full" />
    </>
  );
};

export default LpList;
