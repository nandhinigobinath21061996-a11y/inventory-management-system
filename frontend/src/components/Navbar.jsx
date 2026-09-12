import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <Link to="/">InventoryPro</Link>
        </div>

        {/* Right Buttons */}
        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;