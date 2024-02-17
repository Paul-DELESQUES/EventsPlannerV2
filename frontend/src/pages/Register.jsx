import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/Register.scss";

function Register() {
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      navigate("/connexion");
    }, 500);

    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    //     {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         email: emailRef.current.value.toString(),
    //         password,
    //         profile: "Structure",
    //       }),
    //     }
    //   );

    //   if (response.status === 201) {
    //     const userData = await response.json();

    //     const structureResponse = await fetch(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/structures`,
    //       {
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           userId: userData.insertId,
    //           email: emailRef.current.value.toString(),
    //         }),
    //       }
    //     );

    //     if (structureResponse.status === 201) {
    //       navigate("/pro/login");
    //     } else {
    //       console.info(structureResponse);
    //     }
    //   } else {
    //     console.info(response);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="structureInscriptionContainer">
        <div className="leftContainer">
          <div className="titleStructureInscription">
            <h1>Baby Place</h1>
            <span className="pro">PRO</span>
          </div>
          <p className="subtitleStructureInscription">
            Gérez votre agenda professionnel
          </p>
          <p className="dhInscription">24h/24 et 7j/7</p>
        </div>
        <div className="rightContainer">
          <h3 className="spaceInscription"> Inscription à mon espace </h3>
          <input
            className="inputInscription"
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            className="inputInscription"
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <input
            className="inputInscription"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className="inputInscription"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            className="inputInscription"
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />{" "}
          <label className="checkboxCGU">
            <input type="checkbox" /> J'accepte les{" "}
            <a href="/NotFound">conditions générales d'utilisation.</a>
          </label>
          <button className="structureInscriptionBtn" type="submit">
            S'inscrire
          </button>
          <div className="linksInscription"> </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
