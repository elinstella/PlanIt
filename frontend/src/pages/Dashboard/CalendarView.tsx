import { useState } from "react";
import { Calendar, View } from "react-big-calendar";
import { format, parseISO } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Todo } from "./Dashboard"; // Justera om din Todo-typ kommer från t.ex. ../types
import { enUS } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

type Props = {
  todos: Todo[];
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => 1,
  getDay: (date: unknown) => {
    const d = date instanceof Date ? date : new Date(date as string);
    return d.getDay();
  },
  locales,
});

const TodoCalendar = ({ todos }: Props) => {
  const [view, setView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => {
      const startDate = new Date(todo.dueDate! + "T" + (todo.dueTime || "09:00"));
      return {
        title: todo.title,
        start: startDate,
        end: startDate,
        allDay: !todo.dueTime,
      };
    });

  return (
    <div className="bg-dark mt-12 rounded-lg w-full overflow-x-auto">
      <div className="min-w-[600px] sm:min-w-full p-4">
        <h3 className="text-xl font-semibold text-mutedlilac mb-4">Todo Calendar</h3>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={(newView) => setView(newView)}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          className="w-full"
          style={{
            height: 500,
            borderRadius: 12,
            padding: 16,
            backgroundColor: "white",
          }}
        />
      </div>
    </div>
  );
};

export default TodoCalendar;
