import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddProviderModal.scss";

function AddProviderForListModal({ visible, onClose }) {
  const customStyles = {
    background: "rgb(246, 240, 240)",
    padding: "1rem",
    borderRadius: "1.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: "50%",
    height: "80%",
  };
  const [civility, setCivility] = useState("mr");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [typeProvider, setTypeProvider] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitCustomer = async () => {
    const provider = {
      civility,
      name,
      lastname,
      firstname,
      typeProvider,
      email,
      phone,
      address,
      zipCode,
      city,
      country,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/providerslist`,
        provider
      );
      console.info("Success:", response);
      if (response.data) {
        onClose();
      }
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
              value={typeProvider}
              onChange={(e) => setTypeProvider(e.target.value)}
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
            handleSubmitCustomer();
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
