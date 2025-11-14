import { useCallback, useState } from "react";
import Kebab from "../../icons/Kebab";
import { Pencil } from "../../icons/Pencil";
import { Trash } from "../../icons/Trash";

export const LpReviewEditButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    console.log("edit");
  }, []);

  const handleDelete = useCallback(() => {
    console.log("delete");
  }, []);

  return (
    <>
      <button
        onClick={handleToggle}
        className="flex items-center w-6 h-6 rounded-full justify-center hover:bg-neutral-600 transition-colors cursor-pointer"
      >
        <Kebab width={16} height={16} />
      </button>
      {isOpen && (
        <div className="absolute right-[-30px] top-5 flex items-center gap-1 bg-black/80 p-2 rounded-md justify-center">
          <button
            onClick={handleEdit}
            className="hover:bg-neutral-600 transition-colors cursor-pointer p-1 rounded-md"
          >
            <Pencil width={16} height={16} />
          </button>
          <button
            onClick={handleDelete}
            className="hover:bg-neutral-600 transition-colors cursor-pointer p-1 rounded-md"
          >
            <Trash width={16} height={16} />
          </button>
        </div>
      )}
    </>
  );
};
