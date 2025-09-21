export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

export type TodoContextType = {
  todoList: Todo[];
  onCreate: (text: string) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};
