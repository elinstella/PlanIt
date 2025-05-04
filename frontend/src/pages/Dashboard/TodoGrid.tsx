import TodoCard from "./TodoCard";
import { Todo } from "./Dashboard";

type Props = {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
};

const TodoGrid = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0)
    return <p className="text-bluegray">No todos to display.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoGrid;
