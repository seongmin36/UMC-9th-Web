import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onComplete, onDelete }: TodoItemProps) => {
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

export default TodoItem;
