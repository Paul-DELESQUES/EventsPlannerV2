import React from "react";
import "../sass/ModalDelete.scss";

function ModalDelete({ visible, onClose, onDelete }) {
  if (!visible) return null;

  return (
    <div className="modal-delete">
      <div className="modal-content">
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
        <button onClick={onDelete}>Oui</button>
        <button onClick={onClose}>Non</button>
      </div>
    </div>
  );
}

export default ModalDelete;
