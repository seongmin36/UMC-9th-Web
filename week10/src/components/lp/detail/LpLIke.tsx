import {
  useDeleteLike,
  usePostLike,
} from "../../../hooks/lps/mutation/useLike";
import { HeartIcon } from "../../icons/Heart";

interface LpLikeProps {
  isLiked: boolean;
  likeCount: number;
  lpId: number;
}

const LpLike = ({ isLiked, likeCount, lpId }: LpLikeProps) => {
  const { mutate: postLike } = usePostLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleLike = () => {
    if (isLiked) {
      deleteLike({ lpId: lpId });
    } else {
      postLike({ lpId: lpId });
    }
  };
  return (
    <div className="relative flex items-center justify-center gap-1">
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={handleLike}
      >
        <HeartIcon
          width={28}
          height={28}
          className="absolute top-[-1px] right-3"
          fill={isLiked ? "#ff4b6b" : "white"}
        />
      </button>
      <span className="text-sm text-gray-200 absolute top-0 right-0">
        {" "}
        {likeCount}
      </span>
    </div>
  );
};

export default LpLike;
