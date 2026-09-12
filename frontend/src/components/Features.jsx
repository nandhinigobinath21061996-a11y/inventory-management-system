import "../css/features.css";

import {
  FaBoxOpen,
  FaTruck,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="features-section">

      {/* =====================================
          SECTION HEADING
      ===================================== */}

      <div className="features-header">

        <h2>
          Everything you need to
          <br />
          manage your inventory
        </h2>

        <p>
          Powerful tools to keep your business organized
        </p>

      </div>


      {/* =====================================
          FEATURE CARDS
      ===================================== */}

      <div className="features-container">

        {/* CARD 1 */}

        <div className="feature-card">

          <div className="feature-icon">
            <FaBoxOpen />
          </div>

          <h3>
            Product Management
          </h3>

          <p>
            Add, update and organize your products
            with ease.
          </p>

        </div>


        {/* CARD 2 */}

        <div className="feature-card">

          <div className="feature-icon">
            <FaTruck />
          </div>

          <h3>
            Supplier Management
          </h3>

          <p>
            Manage suppliers and keep track of
            your business partners.
          </p>

        </div>


        {/* CARD 3 */}

        <div className="feature-card">

          <div className="feature-icon">
            <FaChartLine />
          </div>

          <h3>
            Sales & Purchases
          </h3>

          <p>
            Track purchases, sales and inventory
            movement in one place.
          </p>

        </div>

      </div>


      {/* =====================================
          FEATURE HIGHLIGHT
      ===================================== */}

      <div className="feature-highlight">

        {/* LEFT IMAGE */}

        <div className="highlight-image">

          <img
            src="/1.jpg"
            alt="Inventory management"
          />

        </div>


        {/* RIGHT CONTENT */}

        <div className="highlight-content">

          <h2>
            Take control of your
            <br />
            inventory with ease
          </h2>

          <p>
            Manage your products, monitor stock levels
            and keep your inventory organized from one
            powerful system. Get a clear view of your
            business and make better decisions with ease.
          </p>

          <button className="highlight-btn">
            Learn More
          </button>

        </div>

      </div>


      {/* =====================================
          INVENTORY STATISTICS
      ===================================== */}

      <div className="inventory-stats">

        {/* LEFT CONTENT */}

        <div className="stats-intro">

          <h2>
            Helping businesses
            <br />
            <span>manage inventory smarter</span>
          </h2>

          <p>
            Keep your products, suppliers, purchases
            and sales organized in one powerful system.
          </p>

        </div>


        {/* RIGHT STATISTICS */}

        <div className="stats-grid">

          {/* PRODUCTS */}

          <div className="inventory-stat">

            <div className="inventory-stat-icon">
              <FaBoxOpen />
            </div>

            <div>
              <strong>120+</strong>
              <span>Products</span>
            </div>

          </div>


          {/* SUPPLIERS */}

          <div className="inventory-stat">

            <div className="inventory-stat-icon">
              <FaTruck />
            </div>

            <div>
              <strong>18+</strong>
              <span>Suppliers</span>
            </div>

          </div>


          {/* ORDERS */}

          <div className="inventory-stat">

            <div className="inventory-stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <strong>450+</strong>
              <span>Orders Managed</span>
            </div>

          </div>


          {/* SALES */}

          <div className="inventory-stat">

            <div className="inventory-stat-icon">
              <FaChartLine />
            </div>

            <div>
              <strong>₹45K</strong>
              <span>Sales Tracked</span>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          INVENTORY TRACKING SECTION
      ===================================== */}

      <div className="inventory-tracking">

        {/* LEFT CONTENT */}

        <div className="tracking-content">

          <h2>
            Stay on top of your
            <br />
            inventory at every step
          </h2>

          <p>
            Monitor stock levels, identify low-stock
            products and keep your inventory moving
            efficiently. Get the information you need
            to make faster and smarter business decisions.
          </p>

          <button className="tracking-btn">
            Explore Dashboard
          </button>

        </div>


        {/* RIGHT IMAGE */}

        <div className="tracking-image">

          <img
            src="/2.jpg"
            alt="Inventory tracking"
          />

        </div>

      </div>

    </section>
  );
};

export default Features;