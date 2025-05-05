import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { Todo } from "./Dashboard";

type Props = {
  todos: Todo[];
  onEdit?: (todo: Todo) => void;
};

const TodoCalendar = ({ todos, onEdit }: Props) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => {
      let backgroundColor = "#8b5cf6";
      let textColor = "white";

      if (todo.priority === "High") {
        backgroundColor = "#b91c1c";
      } else if (todo.priority === "Medium") {
        backgroundColor = "#facc15";
        textColor = "#1f2937";
      } else if (todo.priority === "Low") {
        backgroundColor = "#0e7490";
      }

      const startTime = todo.dueTime?.split(" - ")[0] || "09:00";

      return {
        title: todo.description?.trim() ? `📌 ${todo.title}` : todo.title,
        start: `${todo.dueDate}T${startTime}`,
        allDay: !todo.dueTime,
        backgroundColor,
        borderColor: backgroundColor,
        textColor,
        extendedProps: {
          fullTodo: todo,
        },
      };
    });

  const handleEventClick = (info: EventClickArg) => {
    const fullTodo: Todo = info.event.extendedProps.fullTodo;
    setSelectedTodo(fullTodo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="bg-white mt-12 mb-10 rounded-2xl w-full overflow-x-auto p-4 shadow-xl relative">
      <h3 className="text-xl font-bold text-dark mb-4">Todo Calendar</h3>
      <div className="min-w-[320px] sm:min-w-full calendar-wrapper text-dark">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
          events={events}
          height={600}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          scrollTime="08:00:00"
          dayMaxEvents={true}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Forces 24-hour format
          }}
          views={{
            dayGridMonth: {
              eventTimeFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format for month view
              },
            },
            timeGridWeek: {
              eventTimeFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format for week view
              },
              slotLabelFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format for slot labels
              },
            },
            timeGridDay: {
              eventTimeFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format for day view
              },
              slotLabelFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format for slot labels
              },
            },
          }}
        />
      </div>

      {selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedTodo.title}
            </h4>

            <div className="space-y-2 text-gray-700 text-sm">
              {selectedTodo.description?.trim() && (
                <p className="flex items-start gap-2">
                  <span>📝</span>
                  <span>{selectedTodo.description.trim()}</span>
                </p>
              )}

              {selectedTodo.dueDate && (
                <p className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{selectedTodo.dueDate}</span>
                </p>
              )}

              {selectedTodo.dueTime && (
                <p className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>{selectedTodo.dueTime}</span>
                </p>
              )}

              {selectedTodo.priority && (
                <p className="flex items-center gap-2">
                  <span>⚡️</span>
                  <span>{selectedTodo.priority}</span>
                </p>
              )}

              {selectedTodo.category && (
                <p className="flex items-center gap-2">
                  <span>🏷️</span>
                  <span>{selectedTodo.category}</span>
                </p>
              )}

              {selectedTodo.location && (
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{selectedTodo.location}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(selectedTodo);
                    closeModal();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCalendar;
