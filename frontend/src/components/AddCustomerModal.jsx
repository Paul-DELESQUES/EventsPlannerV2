import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../sass/AddCustomerModal.scss";

function AddCustomerModal({ visible, onClose, eventId, onAdd }) {
  const customStyles = {
    background: "rgb(246, 240, 240)",
    padding: "1rem",
    borderRadius: "1.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: "80%",
    height: "80%",
  };
  const [prospectSource, setProspectSource] = useState("instagram");
  const [customerType, setCustomerType] = useState("single");
  const [civility, setCivility] = useState("mr");
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

  const handleSubmitCustomer = async () => {
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
      console.info("Success:", response);
      if (response.data.isEventComplete) {
        onClose();
        onAdd();
      } else {
        alert("Please add another customer");
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={customStyles}>
      <div className="container-customers">
        <div className="info-customers">
          <div className="input-info">
            <span className="label">Source du prospect</span>
            <select
              value={prospectSource}
              onChange={(e) => setProspectSource(e.target.value)}
              className="input"
            >
              <option value="word_of_mouth">Bouche à oreille</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="mariage.net">Mariage.net</option>
              <option value="linkedin">linkedin</option>
            </select>
          </div>
          <div className="input-info">
            <span className="label">Type clients</span>
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="input"
            >
              <option value="single">Célibataire</option>
              <option value="couple">Couple</option>
              <option value="professional">Professionnel</option>
            </select>
          </div>
        </div>
        <div className="customer-left">
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
          <div className="input-group">
            <span className="label">Profession</span>
            <input
              type="text"
              className="input"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Date de naissance</span>
            <input
              className="input"
              value={dateOfBirth}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Lieu de naissance</span>
            <input
              className="input"
              value={placeOfBirth}
              type="text"
              onChange={(e) => setPlaceOfBirth(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="label">Nationalité</span>
            <input
              className="input"
              value={nationality}
              type="text"
              onChange={(e) => setNationality(e.target.value)}
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
            prospectSource === "" ||
            customerType === "" ||
            civility === "" ||
            firstname === "" ||
            lastname === "" ||
            email === "" ||
            phone === "" ||
            job === "" ||
            dateOfBirth === "" ||
            placeOfBirth === "" ||
            nationality === "" ||
            address === "" ||
            zipCode === "" ||
            city === "" ||
            country === ""
          }
          className="saveButton-customers"
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

AddCustomerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddCustomerModal;
