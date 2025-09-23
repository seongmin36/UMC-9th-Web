import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export const useTodo = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error('todo는 todo Provider내에서만 사용 가능합니다.');
  }

  return todoContext;
};
