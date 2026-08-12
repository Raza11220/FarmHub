import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <div className="logo-icon">
          FH
        </div>

        <span>FarmHub</span>
      </Link>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/livestock">
          Livestock
        </Link>

        <Link to="/#about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>
      </nav>

      {/* Actions */}
      <div className="nav-actions">

        <button
          className="icon-btn"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* CART */}
        <Link
          to="/cart"
          className="icon-btn cart-btn"
        >
          <ShoppingCart size={20} />

          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>

        <button
          className="menu-btn"
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;