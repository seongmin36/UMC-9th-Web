import { memo, useContext } from "react";
import { TodoContext } from "../context/todoContext";
import type { Todo } from "../types/Todo";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const context = useContext(TodoContext);
  if (!context) return null;
  const { onDelete, onComplete } = context;

  return (
    <li className="flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center bg-gray-100 rounded-md mb-2">
      <p className="text-start">{todo.text}</p>
      <button
        onClick={() => (todo.isDone ? onDelete(todo.id) : onComplete(todo.id))}
        className={`text-white font-normal px-2 py-1 border rounded-lg cursor-pointer transition-colors ${
          todo.isDone
            ? "bg-[#c4302b] hover:bg-[#a82723]"
            : "bg-[#17b75e] hover:bg-[#0a9649]"
        }`}
      >
        {todo.isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default memo(TodoItem);
