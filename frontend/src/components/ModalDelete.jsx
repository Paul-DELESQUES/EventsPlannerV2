import React from "react";
import "../sass/ModalDelete.scss";

function ModalDelete({ onClose, onDelete, id }) {
  return (
    <div className="modal-delete">
      <h2 className="h2">Êtes-vous sûr de vouloir supprimer cet événement ?</h2>
      <p>Cette action est irréversible</p>
      <div className="btn-modaldelete">
        <button onClick={() => onDelete(id)}>Oui</button>
        <button onClick={onClose}>Non</button>
      </div>
    </div>
  );
}

export default ModalDelete;
