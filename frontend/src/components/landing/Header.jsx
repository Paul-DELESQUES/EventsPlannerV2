import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/landing/Header.scss";

function Header() {
  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    });
  }, []);

  return (
    <header className="header-ctn">
      <div className="leftHeader">
        <h2>
          Organiser votre travail dans l'événementiel <br /> de manière simple
          et efficace avec Event Planner
        </h2>
        <div className="headerInputs">
          <button type="button" onClick={() => navigate("/inscription")}>
            Commencer <span>➜</span>
          </button>
        </div>
      </div>
      {showArrow && <div className="scrollDown">&#10095;</div>}
    </header>
  );
}

export default Header;
