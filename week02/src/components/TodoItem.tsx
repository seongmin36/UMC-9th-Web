// components/TodoItem.tsx
import { memo } from 'react';
import type { Todo } from '../types/todo';
import { useTodo } from '../hooks/useTodo';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { onComplete, onDelete } = useTodo();

  return (
    <li className="flex border-none shadow-sm gap-20 justify-between px-3 py-2 items-center rounded-md mb-2 bg-gray-100 dark:bg-[#363636] dark:text-white">
      <p>{todo.text}</p>
      <button
        onClick={() => (todo.isDone ? onDelete(todo.id) : onComplete(todo.id))}
        className={`px-3 py-1 rounded-lg text-white transition-colors ${
          todo.isDone
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {todo.isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default memo(TodoItem);
