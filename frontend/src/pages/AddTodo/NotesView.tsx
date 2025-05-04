import { useState } from "react";

export type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority?: string;
  dueDate?: string;
  dueTime?: string;
  category?: string;
  location?: string;
  completed?: boolean;
};

interface Props {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDeleted?: () => void; // Trigger för att uppdatera efter borttag
}

const NotesView = ({ todos, onEdit, onDeleted }: Props) => {
  const [filter, setFilter] = useState<string>("All");

  const filteredTodos =
    filter === "All"
      ? todos
      : todos.filter((todo) => todo.category === filter);

  const uniqueCategories = Array.from(
    new Set(todos.map((todo) => todo.category || "Uncategorized"))
  );

  const handleDelete = async (id: string) => {
    console.log("🧨 Försöker radera:", id);
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      console.log("✅ Raderad, uppdaterar vy");
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error("❌ Delete-fel:", err);
    }
  };

  return (
    <div className="bg-dark mt-12 p-8 rounded-lg w-full max-w-xl">
      <h3 className="text-xl font-semibold text-mutedlilac mb-4">Your Todos</h3>

      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "All"
              ? "bg-mutedlilac text-white"
              : "bg-neutral text-mutedlilac border border-mutedlilac"
          }`}
        >
          All
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === cat
                ? "bg-mutedlilac text-white"
                : "bg-neutral text-mutedlilac border border-mutedlilac"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-bluegray">No todos in this category.</p>
      ) : (
          <ul className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
          {filteredTodos.map((todo) => (
            <li key={todo._id} className="bg-neutral p-4 rounded shadow text-dark">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{todo.title}</h4>
                  <p className="text-sm text-bluegray">{todo.description}</p>
                  {todo.location && (
                    <p className="text-sm text-bluegray italic">📍 {todo.location}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {todo.dueDate} at {todo.dueTime} • {todo.category || "General"} • {todo.priority || "None"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(todo)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesView;