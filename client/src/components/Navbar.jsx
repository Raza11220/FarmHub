import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <div className="logo-icon">FH</div>
        <span>FarmHub</span>
      </Link>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/livestock">Livestock</Link>
        <Link to="/#about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Actions */}
      <div className="nav-actions">

        {/* Search */}
        <button className="icon-btn" aria-label="Search">
          <Search size={20} />
        </button>

        {/* Cart */}
        <Link to="/cart" className="icon-btn cart-btn">
          <ShoppingCart size={20} />

          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Clerk Login */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="primary-btn">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>  

        {/* Clerk User */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Menu */}
        <button className="menu-btn" aria-label="Menu">
          <Menu size={22} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;