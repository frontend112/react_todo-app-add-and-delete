import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { removeTodo } from '../../api/todos';

type Props = {
  visibleTodos: Todo[];
  loadTodos: () => void;
};

export const TodoList: FC<Props> = ({
  visibleTodos,
  loadTodos,
}) => {
  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
    setTimeout(() => loadTodos(), 300);
  };

  return (
    <section className="todoapp__main">
      {
        visibleTodos.map((
          {
            title,
            completed,
            id,
          },
        ) => (
          <div
            className={cn(
              'todo',
              'item-enter-done',
              { completed },
            )}
            data-cy="todo"
            key={id}
          >
            <div className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </div>

            <span className="todo__title">{title}</span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => handleRemoveTodo(id)}
            >
              ×
            </button>

            <div className="modal overlay">
              <div
                className="modal-background has-background-white-ter"
              />
              <div className="loader" />
            </div>
          </div>
        ))
      }
    </section>
  );
};
