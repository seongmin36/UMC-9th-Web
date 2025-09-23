import { useCallback, useReducer, useRef } from 'react';
import type { Todo } from '../types/todo';
import { TodoContext } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import toast, { Toaster } from 'react-hot-toast';
import { useDarkMode } from '../hooks/useDarkMode';

function reducer(state: Todo[], action): Todo[] {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'COMPLETE':
      return state.map((item) =>
        item.id === action.data.id ? { ...item, isDone: !item.isDone } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.data.id);
    default:
      return state;
  }
}

const TodoList = () => {
  const [todoList, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const { isDark } = useDarkMode();

  const onCreate = useCallback((text: string) => {
    dispatch({
      type: 'CREATE',
      data: { id: idRef.current++, text, isDone: false },
    });
    toast.success('할 일에 추가되었습니다!');
  }, []);

  const onComplete = useCallback((id: number) => {
    dispatch({ type: 'COMPLETE', data: { id } });
    toast('해당 일을 완료하셨군요!', { icon: '👏' });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({ type: 'DELETE', data: { id } });
    toast.success('완료된 일이 삭제되었습니다!');
  }, []);

  return (
    <div className="mx-auto">
      {/* Toast 알림 */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: isDark
            ? {
                background: '#444444',
                color: '#ffffff',
              }
            : {},
        }}
      />

      <div className="border w-120 text-center p-6 rounded-xl shadow-md bg-white dark:bg-[#636363] dark:border-white dark:text-white">
        <TodoContext.Provider
          value={{ todoList, onCreate, onComplete, onDelete }}
        >
          <h1 className="font-bold text-2xl mb-6">KRONG TODO</h1>
          <TodoForm />
          <section>
            <div className="flex justify-evenly gap-20 font-black pb-4 dark:bg-[#636363]">
              <p>할 일</p>
              <p>완료</p>
            </div>
            <div className="flex justify-evenly gap-2">
              {['할 일', '완료'].map((label, idx) => (
                <ul key={label} className="w-60 font-semibold">
                  {todoList
                    .filter((todo) => (idx === 0 ? !todo.isDone : todo.isDone))
                    .map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
              ))}
            </div>
          </section>
        </TodoContext.Provider>
      </div>
    </div>
  );
};

export default TodoList;
