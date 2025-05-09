import { useEffect, useState, useRef } from "react";
import CreateTask from "./CreateTask";
import NotesView, { Todo } from "./NotesView";
import TrashView from "./TrashView";

const AddTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("✅ Fetched todos:", data);
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (editingTodo && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingTodo]);

  const forceRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo); // 👈 ingen scroll här längre
  };

  const handleRestore = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/restore/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      forceRefresh();
    } catch (err) {
      console.error("Error restoring todo:", err);
    }
  };

  const handleEmptyTrash = async () => {
    try {
      await fetch("http://localhost:5000/api/todos/trash/empty", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      forceRefresh();
    } catch (err) {
      console.error("Error emptying trash:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral px-4 py-16">
      <CreateTask
        ref={formRef}
        onSaved={forceRefresh}
        editingTodo={editingTodo}
        clearEditing={() => setEditingTodo(null)}
      />

      <NotesView
        todos={todos}
        onEdit={handleEdit}
        onDeleted={forceRefresh}
      />

      <TrashView
        refreshKey={refreshKey}
        onRestore={handleRestore}
        onEmpty={handleEmptyTrash}
      />
    </div>
  );
};

export default AddTodo;
