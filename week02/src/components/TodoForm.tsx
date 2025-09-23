import { useCallback, useState } from 'react';
import { useTodo } from '../hooks/useTodo';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const { onCreate } = useTodo();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      onCreate(todo);
      setTodo('');
    }
  };

  return (
    <form
      className="flex justify-center items-center gap-2 mb-6 w-full"
      onSubmit={addTodo}
    >
      <input
        type="text"
        value={todo}
        placeholder="할 일 입력"
        className="border border-gray-300 rounded-md min-w-80 px-2 py-1 bg-white text-black dark:bg-[#363636] dark:text-white dark:border-gray-500"
        onChange={onChange}
      />
      <button
        type="submit"
        className="text-white px-4 py-1 bg-green-600 hover:bg-green-700 transition-colors rounded-lg"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
