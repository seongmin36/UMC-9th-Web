import { useCallback, useContext, useState } from "react";
import { TodoContext } from "../context/todoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState<string>("");

  // e : 강제 any타입 추론으로 인한 eslint 오류 (React.ChangeEvent<HTMLInpuElement>)
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const context = useContext(TodoContext);
  if (!context) return null;
  const { onCreate } = context;

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      onCreate(todo);
      setTodo("");
    }
  };
  console.log(todo);

  return (
    <>
      <h1 className="font-bold text-2xl my-4">KRONG TODO</h1>

      <form
        className="flex justify-center items-center gap-2 mb-4 w-full"
        onSubmit={addTodo}
      >
        <input
          type="text"
          value={todo}
          placeholder="할 일 입력"
          className="border border-gray-300 rounded-md min-w-80 px-2 py-1 "
          onChange={onChange}
        />
        <button
          type="submit"
          className="text-white px-2 py-1 bg-[#17b75e] hover:bg-[#0a9649] transition-colors border rounded-lg cursor-pointer"
        >
          할 일 추가
        </button>
      </form>
    </>
  );
};

export default TodoForm;
