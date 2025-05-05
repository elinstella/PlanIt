import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Todo } from "./NotesView";

interface TrashTodo extends Todo {
  deletedAt: string;
}

interface Props {
  refreshKey: number;
  onRestore: (id: string) => void;
  onEmpty: () => void;
}

const TrashView = ({ refreshKey, onRestore, onEmpty }: Props) => {
  const [trashedTodos, setTrashedTodos] = useState<TrashTodo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  useEffect(() => {
    fetchTrashed();
  }, [refreshKey]);

  const fetchTrashed = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/todos/trash", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTrashedTodos(data.todos || data || []);
    } catch (err) {
      console.error("❌ Failed to fetch trash:", err);
    }
  };

  const handleRestore = async (id: string) => {
    await onRestore(id);
  };

  const handleEmptyTrash = async () => {
    if (trashedTodos.length === 0) return;
    await onEmpty();
    setConfirmEmpty(false);
  };

  return (
    <div className="bg-dark mt-12 p-8 rounded-lg w-full max-w-xl">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setConfirmEmpty(false);
        }}
        className="flex justify-between items-center cursor-pointer hover:bg-mutedlilac/10 transition mb-4"
      >
        <h3 className="text-xl font-semibold text-mutedlilac">Trash</h3>
        <Trash2 className="text-mutedlilac" />
      </div>

      {isOpen && (
        <>
          {trashedTodos.length > 0 && (
            <div className="flex justify-end mb-4">
              {!confirmEmpty ? (
                <button
                  onClick={() => setConfirmEmpty(true)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Empty Trash
                </button>
              ) : (
                <div className="flex gap-2">
                  <span className="text-sm text-red-300">Are you sure?</span>
                  <button
                    onClick={handleEmptyTrash}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Yes, empty
                  </button>
                  <button
                    onClick={() => setConfirmEmpty(false)}
                    className="text-sm text-gray-400 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {trashedTodos.length === 0 ? (
            <p className="text-bluegray">Trash is empty.</p>
          ) : (
            <ul className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
              {trashedTodos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-neutral p-4 rounded shadow text-dark"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{todo.title}</h4>
                      <p className="text-sm text-bluegray">{todo.description}</p>
                      {todo.location && (
                        <p className="text-sm text-bluegray italic">
                          📍 {todo.location}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 italic">
                        Deleted at {new Date(todo.deletedAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRestore(todo._id)}
                      className="text-sm text-green-500 hover:underline"
                    >
                      Restore
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TrashView;
