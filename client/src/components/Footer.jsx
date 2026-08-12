import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/assets/images/logo.png" alt="FarmHub logo" className="footer-logo" />
            <span>FarmHub</span>
          </div>
          <p>
            Trusted livestock sourcing for modern farms, breeders, and animal lovers.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/livestock">Livestock</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <span className="footer-contact-item">
            <Phone size={16} />
            <a href="tel:+923001234567">+92 300 1234567</a>
          </span>
          <span className="footer-contact-item">
            <Mail size={16} />
            <a href="mailto:info@hmftj.com">info@hmftj.com</a>
          </span>
          <span className="footer-contact-item">
            <MapPin size={16} />
            <span>Punjab, Pakistan</span>
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FarmHub. All rights reserved.</p>
        <div className="social-row" aria-label="Social media links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <img src="/assets/images/facebook.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src="/assets/images/instagram.png" alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
