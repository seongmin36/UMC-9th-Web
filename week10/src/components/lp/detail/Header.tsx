import type { Lp } from "../../../types/lps/lp";
import type { User } from "../../../types/user";
import timeAgo from "../../../utils/timeFormat";
import { CheckIcon } from "../../icons/CheckIcon";
import { Pencil } from "../../icons/Pencil";
import { Trash } from "../../icons/Trash";

interface HeaderProps {
  lp: Lp;
  user: User;
  isSetting: boolean;
  handleSetting: () => void;
  handlePatchLp: () => void;
  handleDeleteLp: () => void;
  handleCancel: () => void;
}
export const Header = ({
  lp,
  user,
  isSetting,
  handleSetting,
  handlePatchLp,
  handleDeleteLp,
  handleCancel,
}: HeaderProps) => {
  const isAuthor = user?.id === lp?.author?.id;

  return (
    <div className="flex items-start justify-between mb-6">
      {/* 왼쪽: 작성자 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#363636] flex items-center justify-center text-xs font-semibold overflow-hidden">
          <img
            className="w-full h-full rounded-full object-cover"
            src={lp?.author?.avatar ?? "/src/assets/user.svg"}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {lp?.author?.name ?? "익명"}
          </span>
          <span className="text-xs text-gray-400">
            {lp?.createdAt ? timeAgo(lp.createdAt) + ` 작성됨` : ""}
          </span>
        </div>
      </div>

      {/* 오른쪽: 시간 + 액션 */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-gray-400">
          {lp?.updatedAt
            ? timeAgo(lp.updatedAt) + " 수정됨"
            : lp?.createdAt
            ? timeAgo(lp.createdAt) + " 작성됨"
            : ""}
        </span>
        <div className="flex items-center gap-3 text-gray-400">
          {isAuthor && (
            <>
              {isSetting ? (
                <>
                  <button
                    className="hover:text-[#1298c5] transition-colors cursor-pointer"
                    onClick={handlePatchLp}
                  >
                    <CheckIcon color="white" width={24} height={24} />
                  </button>
                  <button
                    className="hover:text-gray-200 transition-colors cursor-pointer text-xs"
                    onClick={handleCancel}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:text-[#1298c5] transition-colors cursor-pointer"
                    onClick={handleSetting}
                  >
                    <Pencil color="white" width={24} height={24} />
                  </button>
                  <button
                    className="hover:text-red-500 transition-colors cursor-pointer"
                    onClick={handleDeleteLp}
                  >
                    <Trash color="white" width={24} height={24} />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
