import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddEventModal.scss";

function AddEventModal({ visible, onClose, onNext }) {
  const isSmallScreen = window.matchMedia("(max-width: 390px)").matches;

  const customStyles = {
    background: "rgb(246, 240, 240)",
    padding: "1rem",
    borderRadius: isSmallScreen ? "0rem" : "1.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: isSmallScreen ? "100%" : "50%",
    height: isSmallScreen ? "100vh" : "60%",
    overflow: isSmallScreen ? "auto" : "hidden",
  };
  const [eventType, setEventType] = useState("wedding");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [guestsNumber, setGuestsNumber] = useState(null);
  const [childsNumber, setChildsNumber] = useState(null);
  const [budget, setBudget] = useState(null);
  const [importantNote, setImportantNote] = useState("");

  const handleNextClick = async (e) => {
    e.preventDefault();
    const event = {
      eventType,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      eventLocation,
      guestsNumber: Number(guestsNumber),
      childsNumber: Number(childsNumber),
      budget: Number(budget),
      importantNote,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`,
        event
      );
      onNext(response.data.id);
      toast.info("L'événement a bien été créé");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <form onSubmit={handleNextClick} className="container">
        <div className="input-group">
          <label htmlFor="label">
            Type de l'évenement
            <select
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="wedding">Mariage</option>
              <option value="baptism">Baptême</option>
              <option value="gender_reveal">Gender Reveal</option>
              <option value="baby_shower">Baby Shower</option>
              <option value="anniversary">Anniversaire</option>
              <option value="evjf">EVJF</option>
              <option value="evg">EVG</option>
              <option value="other">Autre</option>
            </select>
          </label>

          <label htmlFor="label">
            Date de début
            <input
              required
              type="date"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Date de fin
            <input
              required
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Heure de début
            <input
              required
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Heure de fin
            <input
              required
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Lieu de l'évenement
            <input
              required
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Prévisions des invités
            <input
              required
              type="text"
              value={guestsNumber}
              onChange={(e) => setGuestsNumber(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Prévisions des enfants
            <input
              required
              type="text"
              value={childsNumber}
              onChange={(e) => setChildsNumber(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Budget souhaité
            <input
              required
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </label>
          <label htmlFor="label">
            Note importante
            <textarea
              required
              rows={10}
              value={importantNote}
              className="input-important"
              type="text"
              onChange={(e) => setImportantNote(e.target.value)}
            />
          </label>
          <button type="submit" className="saveButton">
            Suivant
          </button>
        </div>
      </form>
    </Rodal>
  );
}

AddEventModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default AddEventModal;
