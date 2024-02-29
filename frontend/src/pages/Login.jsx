import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../sass/Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePwd, setTypePwd] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setTimeout(() => {
      navigate("/dashboard/agenda");
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
    <div className="login connexion">
      <main>
        <Link to="/inscription">
          <button type="button" className="login-register">
            S'inscrire
          </button>
        </Link>
        <h3>Se connecter</h3>

        <form>
          <label htmlFor="email">
            <input
              required
              type="email"
              name="email"
              value={email}
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
              value={password}
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
        </form>
        <div className="button-bas">
          <button
            className="butt grad"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Se connecter
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
