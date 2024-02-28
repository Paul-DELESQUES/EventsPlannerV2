import { Link } from "react-router-dom";
import iconsSidebar from "../../assets";

function Navbar() {
  return (
    <nav className="nav">
      <div className="logo-ctn">
        <img src={iconsSidebar.logo2} alt="" className="logo-nav" />
        <p className="logotxt">Events Planner</p>
      </div>
      <Link to="/connexion" className="connect-nav">
        <button type="button" className="btn-nav">
          <span>Se connecter</span>
          <span className="arrow">➜</span>
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;