import { useMemo } from "react";
import type { Review } from "../../../types/lps/review";
import LpReviewCard from "./LpReviewCard";
import { LpReviewSkeleton } from "./LpReviewSkeleton";

interface LpReviewListProps {
  reviews?: Review[];
  showInitialSkeleton: boolean;
  isFetchingNextPage: boolean;
}

const LpReviewList = ({
  reviews,
  showInitialSkeleton,
  isFetchingNextPage,
}: LpReviewListProps) => {
  const hasReviews = useMemo(
    () => Boolean(reviews && reviews.length > 0),
    [reviews]
  );

  return (
    <>
      <ul className="space-y-3">
        {showInitialSkeleton && !hasReviews
          ? Array.from({ length: 4 }).map((_, index) => (
              <li key={`initial-${index}`} className="h-10">
                <LpReviewSkeleton />
              </li>
            ))
          : reviews?.map((review) => (
              <LpReviewCard key={review.id} review={review} />
            ))}
      </ul>

      {isFetchingNextPage && (
        <div className="mt-4 space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <LpReviewSkeleton key={`next-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default LpReviewList;
