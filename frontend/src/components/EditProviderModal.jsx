import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/EditProviderModal.scss";

function EditProviderModal({ visible, onClose, onAdd, providerData }) {
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

  const [civility, setCivility] = useState(providerData.civility);
  const [lastname, setLastname] = useState(providerData.lastname);
  const [firstname, setFirstname] = useState(providerData.firstname);
  const [name, setName] = useState(providerData.name);
  const [providerType, setProviderType] = useState(providerData.provider_type);
  const [email, setEmail] = useState(providerData.email);
  const [phone, setPhone] = useState(providerData.phone);
  const [address, setAddress] = useState(providerData.address);
  const [zipCode, setZipCode] = useState(providerData.zip_code);
  const [city, setCity] = useState(providerData.city);
  const [country, setCountry] = useState(providerData.country);

  const handleSubmitProvider = async (e) => {
    e.preventDefault();
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
    console.log(provider);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/providers/${providerData.id}`,
        provider
      );
      onClose(response.data);
      onAdd();
      toast.info("Prestataire modifié avec succès");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <form onSubmit={handleSubmitProvider} className="container-providers">
        <div className="provider-left">
          <label className="label">
            Civilité
            <select
              required
              value={civility}
              onChange={(e) => setCivility(e.target.value)}
            >
              <option value="mr">Monsieur</option>
              <option value="mrs">Madame</option>
            </select>
          </label>

          <label className="label">
            Nom
            <input
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

          <label className="label">
            Prénom
            <input
              required
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>

          <label className="label">
            Nom entreprise
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="label">
            Type prestataire
            <input
              required
              type="text"
              value={providerType}
              onChange={(e) => setProviderType(e.target.value)}
            />
          </label>

          <label className="label">
            E-mail
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="label">
            Téléphone
            <input
              required
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="label">
            Adresse
            <input
              required
              value={address}
              type="text"
              className="input-address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label className="label">
            Code Postale
            <input
              required
              value={zipCode}
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>

          <label className="label">
            Ville
            <input
              required
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label className="label">
            Pays
            <input
              required
              value={country}
              type="text"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <button type="submit" className="saveButton-providers">
            Modifier
          </button>
        </div>
      </form>
    </Rodal>
  );
}

EditProviderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default EditProviderModal;
