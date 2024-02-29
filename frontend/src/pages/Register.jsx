import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import "../sass/Register.scss";

function Register() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [typePwd, setTypePwd] = useState(true);
  const [typePwd2, setTypePwd2] = useState(true);

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    setTimeout(() => {
      navigate("/connexion");
    }, 500);
  };

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
          <label htmlFor="firstName">
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleFirstNameChange}
            />
            <p>Prénom</p>
          </label>

          <label htmlFor="lastName">
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
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
                setPassword(event.target.value);
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
                setPassword2(event.target.value);
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
