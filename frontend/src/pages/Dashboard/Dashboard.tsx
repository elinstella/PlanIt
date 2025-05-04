import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TodoGrid from "./TodoGrid";
import CalendarView from "./CalendarView";


export type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  dueDate?: string;
  dueTime?: string;
  category?: string;
  location?: string;
  completed?: boolean;
};

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Completed">("All");

  // 🔁 Hämta todos från backend
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🧠 Filtrering baserat på kategori + status
  useEffect(() => {
    let result = [...todos];

    if (filter !== "All") {
      result = result.filter((todo) => todo.category === filter);
    }

    if (statusFilter === "Completed") {
      result = result.filter((todo) => todo.completed);
    } else if (statusFilter === "Active") {
      result = result.filter((todo) => !todo.completed);
    }

    setFiltered(result);
  }, [todos, filter, statusFilter]);

  // ✅ Markera som klar/ej klar
  const handleToggle = async (id: string, done: boolean) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: done }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // ❌ Radera todo
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-neutral text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-mutedlilac">Dashboard</h1>

        {/* Kategori-filter */}
        <FilterBar setFilter={setFilter} current={filter} />

        {/* Status-filter */}
        <div className="flex gap-3 mb-6">
          {["All", "Active", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as "All" | "Active" | "Completed")}
              className={`px-4 py-2 rounded-full border ${
                statusFilter === status
                  ? "bg-mutedlilac text-white"
                  : "bg-neutral border-mutedlilac text-mutedlilac"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <TodoGrid
          todos={filtered}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <CalendarView todos={filtered} />

      </div>
    </div>
  );
};

export default Dashboard;
