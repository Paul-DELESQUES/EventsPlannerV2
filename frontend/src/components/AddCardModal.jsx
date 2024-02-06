import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddCardModal.scss";

const AddCardModal = ({ visible, onClose, handleCardAdd }) => {
  const customStyles = {
    background: "rgb(58 58 58)",
    padding: "20px",
    width: "50%",
    top: "-3rem",
    height: "fit-content",
    maxWidth: "40rem",
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Rodal customStyles={customStyles} visible={visible} onClose={onClose}>
      <div className="container">
        <div>
          <span className="label">Titre de la tache</span>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <span className="label">Description</span>
          <textarea
            rows={10}
            className="input"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          disabled={title === "" && description === ""}
          className="saveButton"
          onClick={() => {
            handleCardAdd(title, description);
            setDescription("");
            setTitle("");
          }}
        >
          Add
        </button>
      </div>
    </Rodal>
  );
};

export default AddCardModal;
