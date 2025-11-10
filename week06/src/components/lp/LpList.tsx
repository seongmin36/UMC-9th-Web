import LpCard from "./LpCard";
import { LpCardSkeleton } from "./skeleton/LpCardSkeleton";
import { Order } from "../../types/common/enum";
import { useGetLpList } from "../../hooks/lps/useGetLpList";
import { useOnInView } from "react-intersection-observer";
import Error from "../common/Error";

const LpList = ({ order }: { order: Order }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    isPending,
  } = useGetLpList(order);

  const trackingRef = useOnInView((inView, entry) => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("요소가 보여집니다.", entry.target);
      fetchNextPage();
    }
  });

  // 데이터 리스트가 있는지 확인
  const dataList = data?.pages?.flatMap((page) => page.data.data ?? []);
  const hasData = Boolean(dataList && dataList.length > 0);
  // 초기 스켈레톤 표시 여부 결정
  const showInitialSkeleton = isPending || (!hasData && isFetching);

  if (isError) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했어요.";
    return <Error error={message} />;
  }

  return (
    <>
      {/* 초기 스켈레톤 표시 */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-20 px-30">
        {/* 초기 스켈레톤 표시 */}
        {showInitialSkeleton && !hasData
          ? Array.from({ length: 10 }).map((_, index) => (
              <LpCardSkeleton key={index} />
            ))
          : dataList?.map((item) => <LpCard key={item.id} data={item} />)}
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
