import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruck,
  FaShoppingBag,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "../css/sidebar.css";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        
        <h2 className="logo">InventoryPro</h2>

        <div className="user-info">
          <h3>{user?.name}</h3>
          <p>{user?.role}</p>
        </div>

        <nav className="menu">

          <Link to="/dashboard" onClick={closeSidebar}>
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link to="/products" onClick={closeSidebar}>
            <FaBoxOpen /> Products
          </Link>

          <Link to="/suppliers" onClick={closeSidebar}>
            <FaTruck /> Suppliers
          </Link>

          <Link to="/purchases" onClick={closeSidebar}>
            <FaShoppingBag /> Purchases
          </Link>

          <Link to="/sales" onClick={closeSidebar}>
            <FaShoppingBag /> Sales
          </Link>

          <Link to="/profile" onClick={closeSidebar}>
            <FaUser /> Profile
          </Link>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt /> Logout
          </button>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;