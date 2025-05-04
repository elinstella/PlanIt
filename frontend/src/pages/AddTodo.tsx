// Fully working AddTodo component with category CRUD, time format toggle, and preserved notes list
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

const defaultForm: Omit<Todo, "_id"> = {
  title: "",
  description: "",
  priority: "",
  dueDate: "",
  dueTime: "",
  category: "",
  location: "",
};

const AddTodo = () => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [use12Hour, setUse12Hour] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryEditValue, setCategoryEditValue] = useState("");

  useEffect(() => {
    fetchTodos();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ category: newCategory }),
      });
      const data = await res.json();
      setCategories(data.categories);
      setNewCategory("");
    } catch (err) {
      console.error("Could not add category", err);
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ category: cat }),
      });
      const data = await res.json();
      setCategories(data.categories);
    } catch (err) {
      console.error("Could not delete category", err);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !categoryEditValue.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldCategory: editingCategory, newCategory: categoryEditValue }),
      });
      const data = await res.json();
      setCategories(data.categories);
      setEditingCategory(null);
      setCategoryEditValue("");
    } catch (err) {
      console.error("Could not update category", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      dueTime: selectedTime ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: use12Hour }) : "",
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
      priority: todo.priority || "",
      dueDate: todo.dueDate || "",
      dueTime: todo.dueTime || "",
      category: todo.category || "",
      location: todo.location || "",
    });

    setSelectedDate(todo.dueDate ? new Date(todo.dueDate) : null);
    if (todo.dueTime) {
      const [h, m] = todo.dueTime.includes("AM") || todo.dueTime.includes("PM") ? todo.dueTime.split(/[: ]/) : todo.dueTime.split(":");
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
      <div className="bg-dark p-10 rounded-lg shadow-lg w-full max-w-xl text-left">
        <h2 className="text-3xl font-bold text-mutedlilac mb-6">
          {editingId ? "Update Todo" : "Add New Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input type="text" name="title" placeholder="Title *" value={form.title} onChange={handleChange} className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray" />

          <textarea name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray" />

          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="px-4 py-3 rounded-md bg-neutral text-dark placeholder:text-bluegray" />

          <select name="priority" value={form.priority} onChange={handleChange} className="px-4 py-3 rounded-md bg-neutral text-dark">
            <option value="">Choose priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select name="category" value={form.category} onChange={handleChange} className="px-4 py-3 rounded-md bg-neutral text-dark">
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <input type="text" placeholder="Add new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="px-4 py-2 rounded-md bg-neutral text-dark placeholder:text-bluegray flex-1" />
            <Button type="button" variant="update" onClick={handleAddCategory}>Add</Button>
          </div>

          <ul className="mt-3 space-y-2">
            {categories.map((cat) => (
              <li key={cat} className="flex justify-between items-center text-sm text-mutedlilac">
                {editingCategory === cat ? (
                  <>
                    <input value={categoryEditValue} onChange={(e) => setCategoryEditValue(e.target.value)} className="bg-neutral text-dark px-2 py-1 rounded mr-2" />
                    <button type="button" onClick={handleUpdateCategory} className="text-green-500 hover:underline text-xs mr-1">Save</button>
                    <button type="button" onClick={() => setEditingCategory(null)} className="text-gray-300 hover:underline text-xs">Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{cat}</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { setEditingCategory(cat); setCategoryEditValue(cat); }} className="text-blue-400 hover:underline text-xs">Edit</button>
                      <button type="button" onClick={() => handleDeleteCategory(cat)} className="text-red-400 hover:underline text-xs">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} placeholderText="Select due date" className="px-4 py-3 rounded-md bg-neutral text-dark" dateFormat="yyyy-MM-dd" />

          <div>
            <DatePicker selected={selectedTime} onChange={(time) => setSelectedTime(time)} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption="Time" dateFormat={use12Hour ? "hh:mm aa" : "HH:mm"} timeFormat={use12Hour ? "hh:mm aa" : "HH:mm"} placeholderText="Select due time" className="px-4 py-3 rounded-md bg-neutral text-dark" />
            <label className="flex items-center gap-2 mt-2 text-sm text-mutedlilac">
              <input type="checkbox" checked={use12Hour} onChange={() => setUse12Hour(!use12Hour)} />
              Use 12-hour format (AM/PM)
            </label>
          </div>

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
                      {todo.dueDate} at {todo.dueTime} • {todo.category || "General"} • {todo.priority || "None"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(todo)} className="text-sm text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(todo._id)} className="text-sm text-red-500 hover:underline">Delete</button>
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
