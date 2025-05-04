import { Todo } from "./Dashboard";
import { motion } from "framer-motion";

type Props = {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
};

const priorityColor = {
  High: "text-red-400",
  Medium: "text-yellow-400",
  Low: "text-green-400",
};

const TodoCard = ({ todo, onToggle, onDelete }: Props) => {
  const priority = (todo.priority as keyof typeof priorityColor) || "Low";
  const colorClass = priorityColor[priority];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200 ${
        todo.completed ? "bg-gray-700 opacity-70 line-through" : "bg-dark"
      } text-white h-full flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl">{todo.title}</h3>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id, !todo.completed)}
            className="h-5 w-5 accent-mutedlilac"
          />
        </div>

        {todo.description && (
          <p className="text-sm text-bluegray mb-2">{todo.description}</p>
        )}

        <div className="text-xs text-muted leading-6 space-y-1">
          <p>🗓 {todo.dueDate || "No date"} ⏰ {todo.dueTime || "No time"}</p>
          <p>📍 {todo.location || "No location"}</p>
          <p>
            📁 {todo.category || "Uncategorized"} •{" "}
            <span className={`${colorClass} font-medium`}>{priority}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onDelete(todo._id)}
          className="text-sm text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TodoCard;
