import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import "../sass/Calendar.scss";
import getFormattedEvents from "../utils/getFormattedEvents";

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getFormattedEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <section className="calendar-content">
      <div className="calendar-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,dayGridMonth",
          }}
          allDaySlot={false}
          firstDay={1}
          locale="fr"
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          editable={false}
          selectable={false}
          selectMirror
          dayMaxEvents
          weekends
          nowIndicator
          scrollTimeReset={false}
          events={events}
        />
      </div>
    </section>
  );
}

export default Calendar;
