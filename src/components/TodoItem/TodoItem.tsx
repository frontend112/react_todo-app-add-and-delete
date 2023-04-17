import { FC, useRef } from 'react';
import cn from 'classnames';
import { LoadTodos, Todo } from '../../types/Todo';
import { removeTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  loadTodos: LoadTodos;
};

export const TodoItem: FC<Props> = ({
  todo,
  loadTodos,
}) => {
  const isActive = useRef(false);
  const { title, completed, id } = todo;

  const handleRemoveTodo = () => {
    isActive.current = true;
    removeTodo(id);
    setTimeout(() => loadTodos(), 300);
  };

  if (todo.id === 0) {
    isActive.current = true;
  }

  return (
    <div
      className={cn(
        'todo',
        'item-enter-done',
        { completed },
      )}
      data-cy="todo"
    >
      <div className="todo__status-label">
        <input type="checkbox" className="todo__status" />
      </div>

      <span className="todo__title">{title}</span>

      <button
        type="button"
        className="todo__remove"
        onClick={handleRemoveTodo}
      >
        ×
      </button>

      <div
        className={cn(
          'overlay',
          'modal',
          { 'is-active': isActive.current },
        )}
      >
        <div
          className="modal-background has-background-white-ter"
        />
        <div className="loader" />
      </div>
    </div>
  );
};
