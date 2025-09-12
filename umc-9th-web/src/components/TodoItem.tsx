import type { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  return (
    <section>
      <li className="flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center bg-gray-100 rounded-md">
        <p className="text-start">{todo.text}</p>
        <button className="text-white font-normal px-2 py-1 bg-[#17b75e] border rounded-lg cursor-pointer">
          <li className="flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center bg-gray-100 rounded-md">
            <p>{todo.text}</p>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-white font-normal px-2 py-1 border rounded-lg bg-[#c4302b] cursor-pointer"
            >
              {todo.isDone ? '완료' : '삭제'}
            </button>
          </li>
        </button>
      </li>
    </section>
  );
};

export default TodoItem;
