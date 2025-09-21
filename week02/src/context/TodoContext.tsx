import { createContext } from "react";
import type { TodoContextType } from "../types/todo";

export const TodoContext = createContext<TodoContextType | null>(null);
