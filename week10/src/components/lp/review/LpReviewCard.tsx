// components/ReviewCard.tsx
import { memo, useCallback, useState, type ChangeEvent } from "react";
import type { Review } from "../../../types/lps/review";
import {
  useDeleteReview,
  usePatchReview,
} from "../../../hooks/lps/mutation/usePatchReview";
import { LpReviewEditButton } from "./LpReviewEditButton";
import { useGetUser } from "../../../hooks/user/useGetUser";
import toast from "react-hot-toast";

interface ReviewCardProps {
  review: Review;
}

function LpReviewCard({ review }: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editContent, setEditContent] = useState(review.content);
  const { data: user } = useGetUser();

  const patchReview = usePatchReview(review.lpId, review.id);
  const deleteReview = useDeleteReview(review.lpId, review.id);

  // 메뉴 열기/닫기
  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // 수정 시작 (본인의 리뷰만 수정할 수 있도록 체크)
  const handleStartEdit = useCallback(() => {
    if (review.author.id !== user?.id) {
      toast.error("본인의 리뷰만 수정할 수 있습니다.", {
        id: "lp-review-permission",
      });
      return;
    }

    setIsEditing(true);
    setIsMenuOpen(false);
  }, [user?.id, review.author.id]);

  // 내용 수정 시 내용 변경용
  const handleChangeContent = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setEditContent(event.target.value);
    },
    []
  );

  // 내용 수정 시 내용 제출
  const handleSubmitEdit = useCallback(() => {
    const processedContent = editContent.trim();
    if (!processedContent) return;

    patchReview.mutate(
      { content: processedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  }, [editContent, patchReview]);

  // 리뷰 삭제
  const handleDelete = useCallback(() => {
    // 삭제하시겠습니까? 메시지
    if (confirm("삭제하시겠습니까?")) {
      deleteReview.mutate();
    }
    setIsMenuOpen(false);
  }, [deleteReview]);

  return (
    <li className="flex gap-4 mb-5">
      {/* 아바타 아이콘 */}
      <img
        src={review.author.avatar as string}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 text-xs font-semibold text-white"
      ></img>

      {/* 내용 영역 */}
      <div className="relative flex-1">
        {/* 이름 + 케밥 자리 */}
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-neutral-100">
            {review.author.name}
          </p>

          <LpReviewEditButton
            isEditing={isEditing}
            isMenuOpen={isMenuOpen}
            onToggleMenu={handleToggleMenu}
            onStartEdit={handleStartEdit}
            onSubmitEdit={handleSubmitEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* 댓글 내용 */}
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={handleChangeContent}
            className="mt-1 w-full rounded-md border border-neutral-600 bg-transparent p-2 text-sm text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            rows={3}
          />
        ) : (
          <p className="mt-1 text-sm text-neutral-300">{review.content}</p>
        )}
      </div>
    </li>
  );
}

export default memo(LpReviewCard);
