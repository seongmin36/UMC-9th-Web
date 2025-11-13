import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Error from "../../common/Error";
import { Order } from "../../../types/common/enum";
import useGetLpReview from "../../../hooks/lps/query/useGetLpReview";
import LpReviewList from "./LpReviewList";
import { OrderToggle } from "../../common/toggle/OrderToggle";

interface LpReviewProps {
  lpId: number;
  initialOrder?: Order;
  cursor?: number;
  limit?: number;
}

const LpReview = ({
  lpId,
  initialOrder = Order.desc,
  cursor = 0,
  limit = 4,
}: LpReviewProps) => {
  const [order, setOrder] = useState<Order>(initialOrder);

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useGetLpReview(lpId, cursor, limit, order);

  const { ref: trackingRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("다음 페이지 로드");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const hasReviews = Boolean(reviews && reviews.length > 0);
  const showInitialSkeleton = isPending || (!hasReviews && isFetching);

  if (isError) {
    const message =
      error instanceof Error ? error.message : "리뷰를 불러오지 못했어요.";
    return <Error error={message} />;
  }

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-neutral-900 p-4">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-200">댓글</h2>
        <div className="flex gap-2 text-xs text-neutral-500">
          <OrderToggle
            order={order}
            onChangeOrder={(order) => setOrder(order)}
          />
        </div>
      </header>
      <LpReviewList
        reviews={reviews}
        showInitialSkeleton={showInitialSkeleton}
        isFetchingNextPage={isFetchingNextPage}
      />
      <div ref={trackingRef} className="h-10" />
    </section>
  );
};

export default LpReview;
