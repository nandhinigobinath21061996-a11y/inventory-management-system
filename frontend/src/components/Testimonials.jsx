import "../css/testimonials.css";

import {
  FaArrowRight,
} from "react-icons/fa";

const Testimonials = () => {
  return (
    <>
      {/* =====================================
          TESTIMONIAL SECTION
      ===================================== */}

      <section className="testimonial-section">

        <div className="testimonial-container">

          {/* LEFT IMAGE */}

          <div className="testimonial-image">

            <img
              src="/3.jpg"
              alt="Inventory management"
            />

          </div>


          {/* RIGHT CONTENT */}

          <div className="testimonial-content">

            <div className="quote-mark">
              “
            </div>

            <h2>
              InventoryPro made
              <br />
              managing our stock so much easier.
            </h2>

            <p className="testimonial-text">
              We can quickly track products, monitor stock levels,
              manage suppliers and keep our sales and purchases
              organized from one powerful system.
            </p>

            <div className="customer-info">

              <strong>Arun Kumar</strong>

              <span>Store Manager</span>

            </div>

          </div>

        </div>


        {/* =====================================
            INVENTORY INSIGHTS
        ===================================== */}

        <div className="inventory-insights">

          {/* HEADING */}

          <div className="insights-header">

            <h2>
              Smart inventory insights
              <br />
              for your business
            </h2>

            <p>
              Practical tips to help you manage products,
              control stock and grow your business efficiently.
            </p>

          </div>


          {/* CARDS */}

          <div className="insights-container">


            {/* CARD 1 */}

            <div className="insight-card">

              <img
                src="/4.jpg"
                alt="Stock management"
              />

              <div className="insight-content">

                <h3>
                  5 Ways to Prevent Stockouts
                  in Your Business
                </h3>

                <p>
                  Keep the right products available
                  and avoid unexpected stock shortages.
                </p>

                <button className="read-more-btn">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </div>


            {/* CARD 2 */}

            <div className="insight-card">

              <img
                src="/5.jpg"
                alt="Inventory tracking"
              />

              <div className="insight-content">

                <h3>
                  How to Track Inventory
                  More Efficiently
                </h3>

                <p>
                  Discover simple ways to monitor stock
                  levels and keep your inventory organized.
                </p>

                <button className="read-more-btn">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </div>


            {/* CARD 3 */}

            <div className="insight-card">

              <img
                src="/6.jpg"
                alt="Sales and purchases"
              />

              <div className="insight-content">

                <h3>
                  Improve Your Inventory
                  with Better Sales Tracking
                </h3>

                <p>
                  Understand your sales and purchases
                  to make smarter business decisions.
                </p>

                <button className="read-more-btn">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default Testimonials;