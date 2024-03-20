import axios from "axios";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "../sass/Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePwd, setTypePwd] = useState(true);
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userLogin,
        { withCredentials: true }
      );
      const auth = response.data;
      if (auth) {
        setUser(auth);
        navigate("/dashboard/agenda");
      } else {
        console.error("Invalid id", auth);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Identifiants incorrects");
    }
  };

  return (
    <section className="login connexion">
      <main>
        <Link to="/inscription">
          <button type="button" className="login-register">
            S'inscrire
          </button>
        </Link>
        <h3>Se connecter</h3>

        <form onSubmit={handleLogin}>
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
          <button type="submit" className="button-bas">
            Se connecter
          </button>
        </form>
      </main>
    </section>
  );
}

export default Login;
