import axios from "axios";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import "../sass/Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [hashPassword, setHashPassword] = useState("");
  const [hashPassword2, setHashPassword2] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [typePwd, setTypePwd] = useState(true);
  const [typePwd2, setTypePwd2] = useState(true);

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleSubmit = async () => {
    if (hashPassword !== hashPassword2) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const userRegister = {
      email,
      password: hashPassword,
      lastname,
      firstname,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userRegister
      );
      console.info("Success:", response);
      navigate("/connexion");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register connexion">
      <main>
        <Link to="/connexion">
          <button type="button" className="se-connecter">
            Se connecter
          </button>
        </Link>
        <h3>Création de compte</h3>

        <form>
          <label htmlFor="firstname">
            <input
              required
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleFirstNameChange}
            />
            <p>Prénom</p>
          </label>

          <label htmlFor="lastname">
            <input
              required
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleLastNameChange}
            />
            <p>Nom</p>
          </label>
          <label htmlFor="email">
            <input
              required
              type="email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <p>E mail</p>
          </label>

          <label htmlFor="mdp">
            <input
              required
              type={typePwd ? "password" : "text"}
              name="mdp"
              id="mdp"
              onChange={(event) => {
                setHashPassword(event.target.value);
              }}
            />
            <p>Mot de passe</p>
            <button
              type="button"
              className="view-password"
              onClick={() => setTypePwd(!typePwd)}
            >
              {typePwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </label>

          <label htmlFor="mdp2">
            <input
              required
              type={typePwd2 ? "password" : "text"}
              name="mdp2"
              id="mdp2"
              onChange={(event) => {
                setHashPassword2(event.target.value);
              }}
            />
            <p>Confirmer Mot de passe</p>
            <button
              type="button"
              className="view-password"
              onClick={() => setTypePwd2(!typePwd2)}
            >
              {typePwd2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </label>
        </form>

        {/* {otherPassword && (
          <p className="emailFail">
            Cet email est déjà utilisé, vous pouvez vous connecter en haut à
            droite
          </p>
        )} */}
      </main>
      <div className="button-bas">
        <button
          type="button"
          className="butt grad"
          onClick={() => handleSubmit()}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}
export default Register;
