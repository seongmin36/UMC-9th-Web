import { useState } from "react";
import TodoForm from "../components/TodoForm";
import type { Todo } from "../types/Todo";
import TodoItem from "../components/TodoItem";
import toast, { Toaster } from "react-hot-toast";

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // Todo Form 추가 메서드
  const addTodo = (text: string) => {
    setTodoList((todoList) => [
      ...todoList,
      { id: Date.now(), text, isDone: false },
    ]);
    // react-hot-toast 라이브러리
    toast.success("할 일에 추가되었습니다!");
  };

  // Todo 완료로 보내기
  const completeTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    toast(`해당 일을 완료하셨군요!`, {
      icon: "👏",
    });
  };

  // Todo 삭제 메서드
  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    toast.success("완료된 일이 삭제되었습니다!");
  };

  return (
    <div className="flex justify-center items-center bg-amber-50 min-h-screen">
      {/* react-hot-toast 라이브러리 */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="border w-120 text-center p-4 bg-white border-none rounded-xl shadow-md">
        <h1 className="font-bold text-2xl my-4">KRONG TODO</h1>
        <TodoForm add={addTodo} />
        <section>
          <div className="flex justify-evenly gap-20 font-black pb-4">
            <p>할 일</p>
            <p>완료</p>
          </div>

          <div className="flex justify-evenly gap-2">
            <ul className="w-60 font-semibold">
              {todoList
                .filter((todo) => !todo.isDone)
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onComplete={completeTodo}
                    onDelete={deleteTodo}
                  />
                ))}
            </ul>
            <ul className="w-60 font-semibold">
              {todoList
                .filter((todo) => todo.isDone)
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onComplete={completeTodo}
                    onDelete={deleteTodo}
                  />
                ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TodoList;
