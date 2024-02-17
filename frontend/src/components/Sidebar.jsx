import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoCalendarNumber } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";
import iconsSidebar from "../assets";
import "../sass/Sidebar.scss";

function Sidebar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const handleClickLink = (index) => {
    setActiveLinkIndex(index);
  };
  const navLinks = [
    {
      id: 1,
      title: "Agenda",
      img: <IoCalendarNumber />,
      url: "agenda",
    },
    {
      id: 2,
      title: "Evénements",
      img: <MdEventNote />,
      url: "evenements",
    },
    {
      id: 3,
      title: "Prestataires",
      img: <AiOutlineUser />,
      url: "prestataires",
    },
  ];

  return (
    <section className="sidebar">
      <div className="logo-ctn">
        <img src={iconsSidebar.logo} alt="Logo" className="logo" />
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          {navLinks.map((navLink, index) => (
            <li className="nav-item" key={navLink.id}>
              <Link
                to={`${navLink.url}`}
                className={`nav-link ${
                  index === activeLinkIndex ? "active" : null
                }`}
                onClick={() => handleClickLink(index)}
              >
                {navLink.img}
                <span className="nav-link-text">{navLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="profile-content">
        <div className="profile">
          <div className="profile-details">
            <img src={iconsSidebar.logo} alt="Avatar" />
            <div className="name-job">
              <p className="name">John Wick</p>
              <p className="job"> Wedding Planner</p>
            </div>
          </div>
          <BiLogOut className="logout-icon" />
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
