import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Typ för en Todo
type Todo = {
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

// Standardformulärdata (utan _id)
const defaultForm: Omit<Todo, "_id"> = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  dueTime: "",
  category: "General",
  location: "",
};

const AddTodo = () => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Kunde inte hämta todos:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    const finalForm = {
      ...form,
      dueDate: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      dueTime: selectedTime
        ? selectedTime.toTimeString().split(" ")[0].slice(0, 5)
        : "",
    };

    try {
      const url = editingId
        ? `http://localhost:5000/api/todos/${editingId}`
        : "http://localhost:5000/api/todos";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Misslyckades spara todo");
      }

      setForm(defaultForm);
      setEditingId(null);
      setSelectedDate(null);
      setSelectedTime(null);
      await fetchTodos();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
      await fetchTodos();
    } catch (error) {
      console.error("Kunde inte ta bort todo:", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setForm({
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority || "Medium",
      dueDate: todo.dueDate || "",
      dueTime: todo.dueTime || "",
      category: todo.category || "General",
      location: todo.location || "",
    });

    setSelectedDate(todo.dueDate ? new Date(todo.dueDate) : null);
    if (todo.dueTime) {
      const [h, m] = todo.dueTime.split(":");
      const d = new Date();
      d.setHours(Number(h), Number(m));
      setSelectedTime(d);
    } else {
      setSelectedTime(null);
    }

    setEditingId(todo._id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral px-4 py-16">
      {/* Formulär */}
      <div className="bg-dark p-10 rounded-lg shadow-lg w-full max-w-xl text-left">
        <h2 className="text-3xl font-bold text-mutedlilac mb-6">
          {editingId ? "Update Todo" : "Add New Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={form.title}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray"
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-neutral text-dark"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-neutral text-dark"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
          </select>

          {/* Kalender och tid */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select due date"
            className="px-4 py-3 rounded-md bg-neutral text-dark"
            dateFormat="yyyy-MM-dd"
          />

          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select due time"
            className="px-4 py-3 rounded-md bg-neutral text-dark"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" variant="confirm">
            {editingId ? "Update Todo" : "Save Todo"}
          </Button>
        </form>
      </div>

      {/* Lista */}
      <div className="bg-dark mt-12 p-8 rounded-lg w-full max-w-xl">
        <h3 className="text-xl font-semibold text-mutedlilac mb-4">Your Todos</h3>
        {todos.length === 0 ? (
          <p className="text-bluegray">No todos yet.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo._id} className="bg-neutral p-4 rounded shadow text-dark">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{todo.title}</h4>
                    <p className="text-sm text-bluegray">{todo.description}</p>
                    {todo.location && (
                      <p className="text-sm text-bluegray italic">📍 {todo.location}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {todo.dueDate} at {todo.dueTime} • {todo.category} • {todo.priority}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(todo)}
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
    </div>
  );
};

export default AddTodo;
