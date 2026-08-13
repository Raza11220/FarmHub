import { useEffect, useState } from "react";
import { Menu, MoonStar, Search, ShoppingCart, SunMedium } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = localStorage.getItem("farmhub-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("farmhub-theme", theme);
  }, [theme]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      navigate("/livestock");
      return;
    }

    navigate(`/livestock?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <img src="/assets/images/logo.png" alt="FarmHub logo" className="brand-logo" />
        <span>FarmHub</span>
      </Link>

      <div className="nav-center">
        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/livestock">Livestock</Link>
          <Link to="/#about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <form className="nav-search" onSubmit={handleSearchSubmit} role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search animals, breeds..."
            aria-label="Search livestock"
          />
          <button type="submit" className="search-submit" aria-label="Submit search">
            Search
          </button>
        </form>
      </div>

      {/* Actions */}
      <div className="nav-actions">
        {/* Cart */}
        <Link to="/cart" className="icon-btn cart-btn">
          <ShoppingCart size={20} />

          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="icon-btn"
          aria-label="Toggle dark mode"
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        >
          {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>

        <SignedOut>
          <SignInButton mode="modal" redirectUrl={location.pathname}>
            <button className="primary-btn" type="button">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            userProfileMode="navigation"
            userProfileUrl="/profile"
          />
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