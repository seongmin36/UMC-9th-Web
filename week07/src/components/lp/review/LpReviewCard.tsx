// components/ReviewCard.tsx
import type { Review } from "../../../types/lps/review";
import Kebab from "../../icons/Kebab";

interface ReviewCardProps {
  review: Review;
}

const LpReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <li className="flex gap-3">
      {/* 아바타 아이콘 */}
      <img
        src={review.author.avatar as string}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 text-xs font-semibold text-white"
      ></img>

      {/* 내용 영역 */}
      <div className="flex-1">
        {/* 이름 + 케밥 자리 */}
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-neutral-100">
            {review.author.name}
          </p>

          {/* 케밥 아이콘 자리 - 나중에 svg 넣을 예정 */}
          <Kebab width={16} height={16} />
        </div>

        {/* 댓글 내용 */}
        <p className="mt-1 text-sm text-neutral-300">{review.content}</p>
      </div>
    </li>
  );
};

export default LpReviewCard;
