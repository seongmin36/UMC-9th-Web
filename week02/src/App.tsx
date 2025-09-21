import { Moon, Sun } from "lucide-react";
import "./App.css";
import TodoList from "./pages/TodoList";
import { ThemeContext } from "./context/ThemeContext";
import { useCallback, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`flex flex-col justify-center items-center min-h-screen ${
          isDark ? "bg-[#1c1d1d] text-white" : "bg-amber-50 text-black"
        }`}
      >
        {/* 다크 모드 아이콘 */}
        <button className="fixed top-5 right-10" onClick={toggleTheme}>
          {isDark ? <Moon fill="white" /> : <Sun />}
        </button>
        <TodoList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
