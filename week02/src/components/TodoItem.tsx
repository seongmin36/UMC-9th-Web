import { memo, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import type { Todo } from "../types/todo";
import { ThemeContext } from "../context/ThemeContext";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const context = useContext(TodoContext);
  const theme = useContext(ThemeContext);
  if (!context || !theme) return null;
  const { isDark } = theme;
  const { onDelete, onComplete } = context;

  return (
    <li
      className={`flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center rounded-md mb-2 ${
        isDark ? "bg-[#363636]" : "bg-gray-100"
      }`}
    >
      <p className={`text-start`}>{todo.text}</p>
      <button
        onClick={() => (todo.isDone ? onDelete(todo.id) : onComplete(todo.id))}
        className={`font-normal px-2 py-1 border border-white text-white rounded-lg cursor-pointer transition-colors ${
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
