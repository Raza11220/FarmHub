import { useEffect, useState } from "react";
import { Menu, MoonStar, Search, ShoppingCart, SunMedium } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <img src="/assets/images/logo.png" alt="FarmHub logo" className="brand-logo" />
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
        <button className="icon-btn search-btn" aria-label="Search">
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