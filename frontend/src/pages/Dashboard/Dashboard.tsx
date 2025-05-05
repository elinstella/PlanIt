import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TodoGrid from "./TodoGrid";
import CalendarView from "./CalendarView";
import CreateTask from "../AddTodo/CreateTask";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateFilter, setDateFilter] = useState<"All" | "HasDate" | "NoDate">("All");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

    if (dateFilter === "HasDate") {
      result = result.filter((todo) => !!todo.dueDate);
    } else if (dateFilter === "NoDate") {
      result = result.filter((todo) => !todo.dueDate);
    }

    result.sort((a, b) => {
      const timeA = a.dueTime?.split(" - ")[0] || "";
      const timeB = b.dueTime?.split(" - ")[0] || "";
      return sortOrder === "asc"
        ? timeA.localeCompare(timeB)
        : timeB.localeCompare(timeA);
    });

    setFiltered(result);
  }, [todos, filter, statusFilter, sortOrder, dateFilter]);

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

        <FilterBar
          setFilter={setFilter}
          current={filter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

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

        <div className="mb-12">
          <TodoGrid todos={filtered} onToggle={handleToggle} onDelete={handleDelete} />
        </div>

        <CalendarView todos={filtered} onEdit={setEditingTodo} />

        {editingTodo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
              <CreateTask
                editingTodo={editingTodo}
                onSaved={() => {
                  setEditingTodo(null);
                  fetchTodos();
                }}
                clearEditing={() => setEditingTodo(null)}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditingTodo(null)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
