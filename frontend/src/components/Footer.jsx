import "../css/footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container footer-container">

        {/* Company */}

        <div className="footer-box">
          <h2>InventoryPro</h2>

          <p>
            InventoryPro helps businesses manage products, suppliers,
            purchases and sales with a simple and professional dashboard.
          </p>
        </div>

        {/* Quick Links */}

        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#testimonials">Reviews</a></li>
          </ul>
        </div>

        {/* Contact */}

        <div className="footer-box">
          <h3>Contact</h3>

          <p><FaEnvelope /> support@inventorypro.com</p>
          <p><FaPhone /> +91 98765 43210</p>
          <p><FaMapMarkerAlt /> Bengaluru, India</p>
        </div>

        {/* Social */}

        <div className="footer-box">
          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 InventoryPro. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;