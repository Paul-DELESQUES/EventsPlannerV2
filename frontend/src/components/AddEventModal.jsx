import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
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
    overflow: "auto",
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

  const handleNextClick = async () => {
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
      console.info("Success:", response);
      onNext(response.data.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <div className="container">
        <div className="input-group">
          <span className="label">Type de l'évenement</span>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="input"
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
        </div>
        <div className="input-group">
          <span className="label">Date de l'évenement</span>
          <input
            type="date"
            className="input"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Date de l'évenement</span>
          <input
            type="date"
            className="input"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Heure de début</span>
          <input
            type="time"
            className="input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Heure de fin</span>
          <input
            type="time"
            className="input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Lieu de l'évenement</span>
          <input
            type="text"
            className="input"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Prévisions des invités</span>
          <input
            type="text"
            className="input"
            value={guestsNumber}
            onChange={(e) => setGuestsNumber(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Prévisions des enfants</span>
          <input
            type="text"
            className="input"
            value={childsNumber}
            onChange={(e) => setChildsNumber(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="label">Budget souhaité</span>
          <input
            type="text"
            className="input"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="input-important">
          <span className="label">Note importante</span>
          <textarea
            rows={10}
            className="input"
            value={importantNote}
            type="text"
            onChange={(e) => setImportantNote(e.target.value)}
          />
        </div>
        <button
          type="button"
          disabled={
            eventType === "" ||
            eventStartDate === "" ||
            eventEndDate === "" ||
            startTime === "" ||
            endTime === "" ||
            eventLocation === "" ||
            guestsNumber === "" ||
            childsNumber === "" ||
            budget === "" ||
            importantNote === ""
          }
          className="saveButton"
          onClick={() => {
            handleNextClick();
          }}
        >
          Suivant
        </button>
      </div>
    </Rodal>
  );
}

AddEventModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default AddEventModal;
