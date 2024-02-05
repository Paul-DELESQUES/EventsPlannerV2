import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import iconsSidebar from "../assets";
import AddCustomerModal from "../components/AddCustomerModal";
import AddEventModal from "../components/AddEventModal";
import "../sass/Events.scss";

function Events() {
  const [currentModal, setCurrentModal] = useState(null);
  const [eventId, setEventID] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/eventspage`
    );

    const groupedData = data.reduce((acc, curr) => {
      const eventKey = `${curr.eventDateStart}-${curr.eventType}-${curr.eventLocation}`;
      const date = new Date(curr.eventDateStart);
      const formattedDate = date.toLocaleDateString("fr-FR");

      if (!acc[eventKey]) {
        acc[eventKey] = {
          ...curr,
          eventDateStart: formattedDate,
          customerName: [curr.customerName],
        };
      } else {
        acc[eventKey].customerName.push(curr.customerName);
      }

      return acc;
    }, {});

    setEvents(Object.values(groupedData));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleModalOpen = () => {
    setCurrentModal("event");
  };

  const handleModalClose = () => {
    setCurrentModal(null);
  };

  const handleNextClick = (id) => {
    setEventID(id);
    setCurrentModal("customer");
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/eventspage/${id}`
      );
      fetchEvents();
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const eventTypeMap = {
    wedding: "Mariage",
    baptism: "Baptême",
    gender_reveal: "Gender Reveal",
    baby_shower: "Baby Shower",
    anniversary: "Anniversaire",
    evjf: "EVJF",
    evg: "EVG",
    other: "Autre",
  };

  return (
    <section className="events-content">
      <h2>Evénements</h2>
      <button type="button" className="event-btn" onClick={handleModalOpen}>
        Ajouter un événement
      </button>
      {currentModal === "event" && (
        <AddEventModal
          visible
          onClose={handleModalClose}
          onNext={handleNextClick}
        />
      )}
      {currentModal === "customer" && (
        <AddCustomerModal
          visible
          onClose={handleModalClose}
          eventId={eventId}
          onAdd={fetchEvents}
        />
      )}
      <div className="events-main">
        {events.map((event) => {
          return (
            <div className="event-card" key={event.id}>
              <img src={iconsSidebar.logo} alt="Avatar" />
              <div className="event-info">
                <h4>{event.customerName.join(" & ")}</h4>
                <p>{event.eventDateStart}</p>
                <p>{eventTypeMap[event.eventType]}</p>
                <p>{event.eventLocation}</p>
              </div>
              <MdEditNote className="edit-icon" />
              <MdDeleteForever
                className="delete-icon"
                onClick={() => handleDeleteEvent(event.id)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Events;