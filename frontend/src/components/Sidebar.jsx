import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaTruck,
  FaShoppingBag,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "../css/sidebar.css";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">InventoryPro</h2>

      <div className="user-info">
        <h3>{user?.name}</h3>
        <p>{user?.role}</p>
      </div>

      <nav className="menu">
  <Link to="/dashboard">
    <FaTachometerAlt /> Dashboard
  </Link>

  <Link to="/products">
    <FaBoxOpen /> Products
  </Link>

  <Link to="/suppliers">
    <FaTruck /> Suppliers
  </Link>

  <Link to="/purchases">
    <FaShoppingBag /> Purchases
  </Link>

  <Link to="/sales">
    <FaShoppingBag /> Sales
  </Link>

  {/* <Link to="/reports">
    <FaChartBar /> Reports
  </Link> */}

  <Link to="/profile">
    <FaUser /> Profile
  </Link>

  <button onClick={handleLogout} className="logout-btn">
    <FaSignOutAlt /> Logout
  </button>
</nav>
    </div>
  );
};

export default Sidebar;