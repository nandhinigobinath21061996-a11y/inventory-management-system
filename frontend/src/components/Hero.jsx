import "../css/hero.css";
import Login from "../pages/Login";

import {
  FaBoxOpen,
  FaChartLine,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero" id="home">

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <span className="hero-small-title">
            INVENTORY MANAGEMENT
          </span>

          <h1>
            Smart Inventory
            <br />
            <span>Management</span>
            <br />
            Made Simple
          </h1>

          <p>
            Manage your products, suppliers, purchases and sales
            from one powerful inventory management solution
            designed for modern businesses.
          </p>

          <button className="hero-btn">
            Explore Inventory
            <FaArrowRight />
          </button>

          {/* STATISTICS */}
          <div className="hero-stats">

            {/* PRODUCTS */}
            <div className="stat">
              <div className="stat-icon">
                <FaBoxOpen />
              </div>

              <div className="stat-info">
                <strong>120+</strong>
                <span>Products</span>
              </div>
            </div>

            {/* SUPPLIERS */}
            <div className="stat">
              <div className="stat-icon">
                <FaTruck />
              </div>

              <div className="stat-info">
                <strong>18+</strong>
                <span>Suppliers</span>
              </div>
            </div>

            {/* SALES */}
            <div className="stat">
              <div className="stat-icon">
                <FaChartLine />
              </div>

              <div className="stat-info">
                <strong>₹45K</strong>
                <span>Sales</span>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="hero-right">

          <div className="login-wrapper">
            <Login />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;