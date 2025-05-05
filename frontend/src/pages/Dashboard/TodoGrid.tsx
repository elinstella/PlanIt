import TodoCard from "./TodoCard";
import { Todo } from "./Dashboard";

type Props = {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
};

const TodoGrid = ({ todos, onToggle, onDelete }: Props) => {
  return (
    <div className="w-full mb-8">
      {todos.length === 0 ? (
        <p className="text-bluegray text-center">No todos to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-rows-2 auto-cols-[320px] gap-4 w-max max-w-full overflow-x-auto grid-flow-col py-4">
            {todos.map((todo) => (
              <div key={todo._id} className="h-[220px]">
                <TodoCard todo={todo} onToggle={onToggle} onDelete={onDelete} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoGrid;
