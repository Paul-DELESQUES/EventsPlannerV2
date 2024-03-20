import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddCustomerModal.scss";

function AddCustomerModal({ visible, onClose, eventId, onAdd }) {
  const isSmallScreen = window.matchMedia("(max-width: 390px)").matches;

  const customStyles = {
    background: "rgb(246, 240, 240)",
    padding: "1rem",
    borderRadius: isSmallScreen ? "0rem" : "1.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: isSmallScreen ? "100%" : "50%",
    height: isSmallScreen ? "100vh" : "80%",
    overflow: isSmallScreen ? "auto" : "hidden",
  };
  const [prospectSource, setProspectSource] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [civility, setCivility] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();

    const customer = {
      eventId,
      prospectSource,
      customerType,
      civility,
      lastname,
      firstname,
      email,
      phone,
      job,
      dateOfBirth,
      placeOfBirth,
      nationality,
      address,
      zipCode,
      city,
      country,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customers`,
        customer
      );
      if (response.data.isEventComplete) {
        onClose();
        onAdd();
        toast.success("Evénement et client(s) ajouté(s) avec succès");
      } else {
        setProspectSource("");
        setCustomerType("");
        setCivility("");
        setLastname("");
        setFirstname("");
        setEmail("");
        setPhone("");
        setJob("");
        setDateOfBirth("");
        setPlaceOfBirth("");
        setNationality("");
        setAddress("");
        setZipCode("");
        setCity("");
        setCountry("");
        toast.info("Le client a bien été ajouté");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <form onSubmit={handleSubmitCustomer} className="container-customers">
        <div className="info-customers">
          <div className="input-info">
            <label htmlFor="prospectSource">
              Source du prospect
              <select
                required
                value={prospectSource}
                onChange={(e) => setProspectSource(e.target.value)}
              >
                <option value="word_of_mouth">Bouche à oreille</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="mariage.net">Mariage.net</option>
                <option value="linkedin">linkedin</option>
              </select>
            </label>

            <label htmlFor="customerType">
              Type clients
              <select
                required
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
              >
                <option value="single">Célibataire</option>
                <option value="couple">Couple</option>
                <option value="professional">Professionnel</option>
              </select>
            </label>
          </div>
        </div>

        <div className="customer-left">
          <label htmlFor="civility">
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

          <label htmlFor="lastname">
            Nom
            <input
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

          <label htmlFor="firstname">
            Prénom
            <input
              required
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>

          <label htmlFor="email">
            E-mail
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="phone">
            Téléphone
            <input
              required
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label htmlFor="job">
            Profession
            <input
              required
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </label>

          <label htmlFor="dateOfBirth">
            Date de naissance
            <input
              required
              value={dateOfBirth}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Lieu de naissance
            <input
              required
              value={placeOfBirth}
              type="text"
              onChange={(e) => setPlaceOfBirth(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Nationalité
            <input
              required
              value={nationality}
              type="text"
              onChange={(e) => setNationality(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Adresse
            <input
              required
              value={address}
              type="text"
              className="input-address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Code Postale
            <input
              required
              value={zipCode}
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Ville
            <input
              required
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label htmlFor="label">
            Pays
            <input
              required
              value={country}
              type="text"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="saveButton-customers">
          Valider
        </button>
      </form>
    </Rodal>
  );
}

AddCustomerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddCustomerModal;
