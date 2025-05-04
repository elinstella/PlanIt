import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Todo } from "./Dashboard";

type Props = {
  todos: Todo[];
};

const TodoCalendar = ({ todos }: Props) => {
  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => {
      // Välj bakgrund och textfärg baserat på prioritet
      let backgroundColor = "#8b5cf6"; // primary/lila
      let textColor = "white";

      if (todo.priority === "High") {
        backgroundColor = "#b91c1c"; // red-dark
        textColor = "white";
      } else if (todo.priority === "Medium") {
        backgroundColor = "#facc15"; // yellow (ljus)
        textColor = "#1f2937"; // gray-800
      } else if (todo.priority === "Low") {
        backgroundColor = "#0e7490"; // cyan-dark
        textColor = "white";
      }

      return {
        title: todo.title,
        start: `${todo.dueDate}T${todo.dueTime || "09:00"}`,
        allDay: !todo.dueTime,
        backgroundColor,
        borderColor: backgroundColor,
        textColor,
      };
    });

  return (
    <div className="bg-white mt-12 rounded-2xl w-full overflow-x-auto p-4 shadow-xl">
      <h3 className="text-xl font-bold text-dark mb-4">Todo Calendar</h3>
      <div className="min-w-[320px] sm:min-w-full">
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
          height="auto"
          aspectRatio={window.innerWidth < 640 ? 0.95 : 1.6}
        />
      </div>
    </div>
  );
};

export default TodoCalendar;
