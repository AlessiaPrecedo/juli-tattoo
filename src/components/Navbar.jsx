import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--open" : ""}`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-name">Juli</span>
          <span className="navbar__logo-sub">tattoo</span>
        </Link>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/galeria"
              className={location.pathname === "/galeria" ? "active" : ""}
            >
              Galería
            </Link>
          </li>
          <li>
            <Link
              to="/prints"
              className={location.pathname === "/prints" ? "active" : ""}
            >
              Prints
            </Link>
          </li>
          <li>
            <Link
              to="/preguntas"
              className={location.pathname === "/preguntas" ? "active" : ""}
            >
              FAQ
            </Link>
          </li>
          <li>
            <a
              href="https://wa.me/549XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__cta"
            >
              Turno
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
