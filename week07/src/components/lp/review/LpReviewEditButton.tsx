import Kebab from "../../icons/Kebab";
import { Pencil } from "../../icons/Pencil";
import { Trash } from "../../icons/Trash";
import { CheckIcon } from "../../icons/CheckIcon";

interface LpReviewEditButtonProps {
  isEditing: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onStartEdit: () => void;
  onSubmitEdit: () => void;
  onDelete: () => void;
}

export const LpReviewEditButton = ({
  isEditing,
  isMenuOpen,
  onToggleMenu,
  onStartEdit,
  onSubmitEdit,
  onDelete,
}: LpReviewEditButtonProps) => {
  return (
    <>
      <button
        onClick={isEditing ? onSubmitEdit : onToggleMenu}
        className="flex items-center w-7 h-7 rounded-full justify-center hover:bg-neutral-600 transition-colors cursor-pointer"
      >
        {isEditing ? (
          <CheckIcon width={16} height={16} color="white" />
        ) : (
          <Kebab width={16} height={16} />
        )}
      </button>
      {!isEditing && isMenuOpen && (
        <div className="absolute right-[-30px] top-7 flex items-center gap-1 bg-black/80 p-2 rounded-md justify-center">
          <button
            onClick={onStartEdit}
            className="hover:bg-neutral-600 transition-colors cursor-pointer p-1 rounded-md"
          >
            <Pencil width={16} height={16} />
          </button>
          <button
            onClick={onDelete}
            className="hover:bg-neutral-600 transition-colors cursor-pointer p-1 rounded-md"
          >
            <Trash width={16} height={16} />
          </button>
        </div>
      )}
    </>
  );
};
