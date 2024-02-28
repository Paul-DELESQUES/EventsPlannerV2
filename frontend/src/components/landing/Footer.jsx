import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";
import iconsSidebar from "../../assets";

import "../../sass/landing/Footer.scss";

function Footer() {
  return (
    <>
      <hr />
      <footer className="footer">
        <div className="footerGrid">
          <div className="footerLeft">
            <div
              className="logoContainer"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img src={iconsSidebar.logo2} alt="" className="logo-footer" />
              <p className="logotxtfooter">Events Planner</p>
            </div>
            <p className="footerAddress">
              P2M Society, 12 rue de la paix 34000 MONTPELLIER
            </p>
            <p className="footerMail">
              info@p2msociety.projet - 04.67.01.01.01
            </p>
          </div>
          <div className="footerRight">
            <div className="socials">
              <a
                href="https://fr-fr.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook id="iconFooter" />
              </a>
              <a
                href="https://twitter.com/?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter id="iconFooter" />
              </a>
              <a
                href="https://www.instagram.com/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram id="iconFooter2" />
              </a>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>
            © P2M Society™, 2024. All rights reserved. Company Registration
            Number: 25417845.
          </p>
          <button
            type="submit"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <FaChevronUp id="chevronUp" />
          </button>
        </div>
      </footer>
    </>
  );
}

export default Footer;
