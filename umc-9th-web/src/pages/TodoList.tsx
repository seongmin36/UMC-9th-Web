import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import type { Todo } from '../types/Todo';
import TodoItem from '../components/TodoItem';

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // Todo 삭제 메서드
  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  // Todo 추가 메서드
  const addTodo = (text: string) => {
    setTodoList([...todoList, { id: Date.now(), text, isDone: false }]);
  };

  return (
    <div className="flex justify-center items-center m-50">
      <div className="border w-120 text-center p-4 bg-white border-none rounded-xl shadow-md">
        <h1 className="font-bold text-2xl my-4">KRONG TODO</h1>
        <TodoForm add={addTodo} />
        <section>
          <div className="flex justify-evenly gap-20 font-black pb-4">
            <p>할 일</p>
            <p>완료</p>
          </div>
          <ul className="flex justify-evenly font-semibold">
            {todoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TodoList;
