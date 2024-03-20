import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCalendarNumber } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";
import iconsSidebar from "../assets";
import { useAuth } from "../context/AuthContext";
import "../sass/Sidebar.scss";

function Sidebar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuth();
  const nameUser =
    user && user.firstname && user.lastname
      ? `${user.firstname} ${user.lastname}`
      : "";

  const handleClickLink = (index) => {
    setActiveLinkIndex(index);
    setIsSidebarOpen(false);
  };
  const handleBurgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Menu burger clicked. isSidebarOpen:", !isSidebarOpen);
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

  console.log("Rendering Sidebar. isSidebarOpen:", isSidebarOpen);

  return (
    <>
      <div
        className={`burger-menu ${isSidebarOpen ? "open" : ""}`}
        onClick={handleBurgerClick}
      >
        {isSidebarOpen ? <FiX size={30} color="white" /> : <FiMenu size={30} />}
      </div>
      <section className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo-ctn">
          <img src={iconsSidebar.logo2} alt="Logo" className="logo" />
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
              <img src={iconsSidebar.logo2} alt="Avatar" />
              <div className="name-job">
                <p className="name">{nameUser}</p>
                <p className="job"> Wedding Planner</p>
              </div>
            </div>
            <Link to="/">
              <BiLogOut className="logout-icon" onClick={() => logout} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
