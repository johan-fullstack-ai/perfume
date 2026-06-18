import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/images/logo.png";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  function handleNavClick() {
    setMenuOpen(false);
  }

  const { isAdmin } = useAuth();

  return (
    <header className="siteHeader">
      <div className="headerInner">
          <img
            src={logo}
            alt="Perfume logo"
            className="logo"
            width="56"
            height="56"
          />

        <button
          className="navToggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navToggleBar"></span>
          <span className="navToggleBar"></span>
          <span className="navToggleBar"></span>
        </button>

        <nav
          className={`mainNav${menuOpen ? " open" : ""}`}
          aria-label="Main navigation"
        >
          <ul className="navList">
            <li>
              <NavLink to="/" className="navLink" onClick={handleNavClick}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink" onClick={handleNavClick}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="navLink" onClick={handleNavClick}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="navLink" onClick={handleNavClick}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to="/cart" className="cartButton" aria-label="Open cart">
          <svg
            className="cartIcon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span
            className="cartBadge"
            data-count={cartCount}
            aria-live="polite"
          >
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
