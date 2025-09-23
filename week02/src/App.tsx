import './App.css';
import TodoList from './pages/TodoList';
import { DarkModeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggleBtn';

function App() {
  return (
    <DarkModeProvider>
      <div className="flex justify-center items-center bg-amber-50 dark:bg-[#363636] dark:text-white min-h-screen">
        <ThemeToggle />
        <TodoList />
      </div>
    </DarkModeProvider>
  );
}

export default App;
