import { useEffect, useState, forwardRef } from "react";
import Button from "../../components/UI/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "./NotesView";

interface Props {
  onSaved: () => void;
  editingTodo: Todo | null;
  clearEditing: () => void;
}

const CreateTask = forwardRef<HTMLFormElement, Props>(
  ({ onSaved, editingTodo, clearEditing }, ref) => {
    const [form, setForm] = useState({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      category: "",
      location: "",
    });

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [categoryEditValue, setCategoryEditValue] = useState("");
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    useEffect(() => {
      if (editingTodo) {
        setForm({
          title: editingTodo.title,
          description: editingTodo.description || "",
          priority: editingTodo.priority || "",
          dueDate: editingTodo.dueDate || "",
          category: editingTodo.category || "",
          location: editingTodo.location || "",
        });

        if (editingTodo.dueDate) {
          setSelectedDate(new Date(editingTodo.dueDate));
        }

        if (editingTodo.dueTime) {
          const [start, end] = editingTodo.dueTime.split(" - ");
          const s = new Date();
          const e = new Date();
          const [sh, sm] = start.split(":");
          const [eh, em] = end.split(":");
          s.setHours(Number(sh), Number(sm));
          e.setHours(Number(eh), Number(em));
          setStartTime(s);
          setEndTime(e);
        }
      }
    }, [editingTodo]);

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
        dueTime:
          startTime && endTime
            ? `${startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })} - ${endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : "",
      };

      const method = editingTodo ? "PUT" : "POST";
      const url = editingTodo
        ? `http://localhost:5000/api/todos/${editingTodo._id}`
        : `http://localhost:5000/api/todos`;

      try {
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalForm),
        });

        setForm({
          title: "",
          description: "",
          priority: "",
          dueDate: "",
          category: "",
          location: "",
        });
        setSelectedDate(null);
        setStartTime(null);
        setEndTime(null);
        clearEditing();
        onSaved();
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error("Save error:", err);
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
        console.error("Failed to add category", err);
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
          body: JSON.stringify({
            oldCategory: editingCategory,
            newCategory: categoryEditValue,
          }),
        });
        const data = await res.json();
        setCategories(data.categories);
        setEditingCategory(null);
        setCategoryEditValue("");
      } catch (err) {
        console.error("Failed to update category", err);
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
        console.error("Failed to delete category", err);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-dark p-6 rounded-lg w-full max-w-xl"
      >
         <h3 className="text-xl font-semibold text-mutedlilac mb-1">
          {editingTodo ? "Edit Todo" : "Add New Todo"}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={form.title}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-neutral text-dark"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-neutral text-dark"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-neutral text-dark"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-neutral text-dark"
        >
          <option value="">Choose priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-neutral text-dark"
        >
          <option value="">Choose category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-2 rounded bg-neutral text-dark flex-1"
          />
          <Button type="button" variant="update" onClick={handleAddCategory}>
            Add
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setShowCategories(!showCategories)}
          className="text-sm text-mutedlilac underline"
        >
          {showCategories ? "Hide categories" : "Show all categories"}
        </button>

        {showCategories && (
          <ul className="text-sm text-mutedlilac space-y-2">
            {categories.map((cat) => (
              <li key={cat} className="flex justify-between items-center">
                {editingCategory === cat ? (
                  <div className="flex gap-2 items-center">
                    <input
                      value={categoryEditValue}
                      onChange={(e) => setCategoryEditValue(e.target.value)}
                      className="bg-neutral text-dark px-2 py-1 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleUpdateCategory}
                        className="text-green-400 text-xs hover:underline"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="text-gray-300 text-xs hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{cat}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryEditValue(cat);
                        }}
                        className="text-blue-400 text-xs hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat)}
                        className="text-red-400 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select due date"
          className="px-4 py-2 rounded bg-neutral text-dark"
          dateFormat="yyyy-MM-dd"
        />

        <div className="flex gap-2">
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Start"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            placeholderText="Start time"
            className="w-full px-4 py-2 rounded bg-neutral text-dark"
          />
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="End"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            placeholderText="End time"
            className="w-full px-4 py-2 rounded bg-neutral text-dark"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" variant="confirm">
          {editingTodo ? "Update Todo" : "Save Todo"}
        </Button>
      </form>
    );
  }
);

export default CreateTask;
