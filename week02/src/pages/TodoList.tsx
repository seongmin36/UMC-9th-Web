import { useCallback, useContext, useReducer, useRef } from "react";
import TodoForm from "../components/TodoForm";
import type { Todo } from "../types/todo";
import TodoItem from "../components/TodoItem";
import toast, { Toaster } from "react-hot-toast";
import { TodoContext } from "../context/TodoContext";
import { ThemeContext } from "../context/ThemeContext";

function reducer(state: Todo[], action): Todo[] {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "COMPLETE":
      return state.map((item) =>
        item.id === action.data.id ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.data.id);
    default:
      return state;
  }
}

const TodoList = () => {
  const [todoList, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // Todo Form 추가 메서드 (useReducer 사용)
  const onCreate = useCallback((text: string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        text: text,
        isDone: false,
      },
    });
    // react-hot-toast 라이브러리
    toast.success("할 일에 추가되었습니다!");
  }, []);

  // Todo 완료로 보내기
  const onComplete = useCallback((id: number) => {
    dispatch({
      type: "COMPLETE",
      data: {
        id: id,
      },
    });
    toast(`해당 일을 완료하셨군요!`, {
      icon: "👏",
    });
  }, []);

  // Todo 삭제 메서드
  const onDelete = useCallback((id: number) => {
    dispatch({
      type: "DELETE",
      data: {
        id: id,
      },
    });
    toast.success("완료된 일이 삭제되었습니다!");
  }, []);

  // theme context 전역 가져오기
  const theme = useContext(ThemeContext);
  if (!theme) return null;
  const { isDark } = theme;

  return (
    <div className={``}>
      {/* react-hot-toast 라이브러리 */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: isDark
            ? {
                background: "#363636",
                color: "#ffffff",
              }
            : {},
        }}
      />
      <div
        className={` ${
          isDark ? "bg-dark border border-white" : "bg-white border-none"
        } border w-120 text-center p-4 rounded-xl shadow-md`}
      >
        {/* 하위 컴포넌트에 useContext()를 제공해주기 위한 Provider 태그 */}
        <TodoContext.Provider
          value={{ todoList, onCreate, onComplete, onDelete }}
        >
          <TodoForm />
          <section>
            <div className="flex justify-evenly gap-20 font-black pb-4">
              <p>할 일</p>
              <p>완료</p>
            </div>
            <div className="flex justify-evenly gap-2">
              {["할 일", "완료"].map((label, idx) => (
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
