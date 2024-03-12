import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddProviderModal.scss";

function AddProviderForListModal({ visible, onClose, onAdd }) {
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

  const [civility, setCivility] = useState("mr");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [providerType, setProviderType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitProvider = async () => {
    const provider = {
      civility,
      lastname,
      firstname,
      name,
      providerType,
      email,
      phone,
      address,
      zipCode,
      city,
      country,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/providers`,
        provider
      );
      onClose(response.data);
      onAdd();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <div className="container-providers">
        <div className="provider-left">
          <div className="input-group">
            <span className="label">Civilité</span>
            <select
              value={civility}
              onChange={(e) => setCivility(e.target.value)}
              className="input"
            >
              <option value="mr">Monsieur</option>
              <option value="mrs">Madame</option>
            </select>
          </div>
          <div className="input-group">
            <span className="label">Nom</span>
            <input
              type="text"
              className="input"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Prénom</span>
            <input
              type="text"
              className="input"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Nom entreprise</span>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Type prestataire</span>
            <input
              type="text"
              className="input"
              value={providerType}
              onChange={(e) => setProviderType(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">E-mail</span>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Téléphone</span>
            <input
              type="text"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input-address">
            <span className="label">Adresse</span>
            <input
              className="input"
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Code Postale</span>
            <input
              className="input"
              value={zipCode}
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Ville</span>
            <input
              className="input"
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Pays</span>
            <input
              className="input"
              value={country}
              type="text"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          disabled={
            civility === "" ||
            firstname === "" ||
            lastname === "" ||
            email === "" ||
            phone === "" ||
            address === "" ||
            zipCode === "" ||
            city === "" ||
            country === ""
          }
          className="saveButton-providers"
          onClick={() => {
            handleSubmitProvider();
          }}
        >
          Valider
        </button>
      </div>
    </Rodal>
  );
}

AddProviderForListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddProviderForListModal;
