import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Error from "../../common/Error";
import { Order } from "../../../types/common/enum";
import useGetLpReview from "../../../hooks/lps/query/useGetLpReview";
import LpReviewList from "./LpReviewList";
import { OrderToggle } from "../../common/toggle/OrderToggle";
import usePostReiview from "../../../hooks/lps/mutation/usePostReview";
import clsx from "clsx";

interface LpReviewProps {
  lpId: number;
  initialOrder?: Order;
  cursor?: number;
  limit?: number;
}

// LP 리뷰
const LpReview = ({
  lpId,
  initialOrder = Order.desc,
  cursor = 0,
  limit = 4,
}: LpReviewProps) => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const postReview = usePostReiview(lpId);

  // 리뷰 내용 변경
  const handleReviewContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReviewContent(e.target.value);
    },
    []
  );

  // 리뷰 작성
  const handleReviewSubmit = useCallback(() => {
    setIsReviewing(true);
    postReview.mutate({ content: reviewContent });
    setReviewContent("");
  }, [postReview, reviewContent, setIsReviewing, setReviewContent]);

  // 리뷰 내용 엔터키 누르면 작성
  const handleReviewContentKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleReviewSubmit();
        return;
      }
    },
    [handleReviewSubmit]
  );

  // 리뷰 작성 완료
  useEffect(() => {
    if (postReview.isSuccess) {
      setIsReviewing(false);
      setReviewContent("");
    }
  }, [postReview.isSuccess]);

  // 리뷰 작성 실패
  useEffect(() => {
    if (postReview.isError) {
      setIsReviewing(false);
    }
  }, [postReview.isError]);

  // 리뷰 리스트 조회
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

  // 다음 페이지 로드
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
      {/* 리뷰 작성 폼 */}
      <div className="relative flex gap-2 mb-8 items-end">
        <textarea
          placeholder="댓글을 입력해주세요."
          rows={1}
          className="w-full p-2 rounded-md border border-neutral-700 text-neutral-100 bg-neutral-800"
          value={reviewContent}
          onChange={handleReviewContentChange}
          onKeyUp={handleReviewContentKeyUp}
        />
        <button
          onClick={handleReviewSubmit}
          disabled={!reviewContent.trim()}
          className={clsx(
            "flex items-center justify-center h-10 w-20 rounded-md border border-neutral-700 text-neutral-100 transition-colors",
            "cursor-pointer bg-neutral-500 hover:bg-neutral-400",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-500"
          )}
        >
          <span className="px-4 py-2 text-center">
            {isReviewing ? "작성 중" : "작성"}
          </span>
        </button>
      </div>
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
