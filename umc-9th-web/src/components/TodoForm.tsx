import { useCallback, useState } from 'react';

interface TodoProps {
  add: (text: string) => void;
}

const TodoForm = ({ add }: TodoProps) => {
  const [todo, setTodo] = useState<string>('');

  const onChange = useCallback((e) => {
    setTodo(e.target.value);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim() !== '') {
      add(todo);
      setTodo('');
    }
  };

  return (
    <>
      <form className="flex justify-center items-center gap-2 mb-4 w-full">
        <input
          type="text"
          placeholder="할 일 입력"
          className="border border-gray-300 rounded-md min-w-80 px-2 py-1"
          onChange={onChange}
        />
        <button
          type="submit"
          className="text-white px-2 py-1 bg-[#17b75e] border rounded-lg cursor-pointer"
          onClick={addTodo}
        >
          할 일 추가
        </button>
      </form>
    </>
  );
};

export default TodoForm;
