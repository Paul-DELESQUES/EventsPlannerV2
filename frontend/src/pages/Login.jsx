import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/Login.scss";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  //   fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: emailRef.current.value,
  //       password: passwordRef.current.value,
  //       profile: "Structure",
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((auth) => {
  //       if (auth.token && (auth.user || auth.structure)) {
  //         localStorage.setItem("structureToken", auth.token);
  //         if (auth.user) {
  //           localStorage.setItem("user", JSON.stringify(auth.user));
  //         }
  //         if (auth.structure) {
  //           localStorage.setItem("structure", JSON.stringify(auth.structure));
  //         }

  //         window.location.href = "/pro/dashboard/";
  //       } else {
  //         console.error("Invalid server response:", auth);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       );
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="structureConnexionContainer">
        <div className="leftContainer">
          <div className="titleStructureConnexion">
            <h1>Events Planner</h1>
            <span className="pro">PRO</span>
          </div>
          <p className="subtitleStructureConnexion">
            Gérez votre agenda professionnel
          </p>
          <p className="dhConnexion">24h/24 et 7j/7</p>
          {/* <img
            className="imgConnexionStructure"
            // src={connexion}
            alt="connexion"
          /> */}
        </div>
        <div className="rightContainer">
          <h3 className="spaceConnexion"> Connexion à mon espace </h3>
          <input
            className="inputConnexion"
            type="email"
            autoComplete="on"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className="inputConnexion"
            type="password"
            autoComplete="on"
            placeholder="Mot de passe"
            ref={passwordRef}
          />
          <label className="checkboxCGU">
            <input type="checkbox" /> J'accepte les{" "}
            <a href="/Error">conditions générales d'utilisation.</a>
          </label>
          <button className="structureConnexionBtn" type="submit">
            Se connecter
          </button>
          <div className="linksConnexion">
            <a className="forgetPwdLink" href="/Error">
              Mot de passe oublié ?
            </a>
            <a className="inscriptionLink" href="/inscription">
              S'inscrire
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
