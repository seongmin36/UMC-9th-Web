import { createContext } from "react";
import type { TodoContextType } from "../types/Todo";

export const TodoContext = createContext<TodoContextType | null>(null);
