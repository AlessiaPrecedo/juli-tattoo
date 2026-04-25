import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "../../styles/Navbar.css";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/prints", label: "Prints" },
  { to: "/preguntas", label: "Preguntas" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <button
            type="button"
            className={`navbar__menu-trigger ${
              isMenuOpen ? "navbar__menu-trigger--active" : ""
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="site-drawer"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={toggleMenu}
          >
            <span className="navbar__burger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="navbar__menu-label">Menu</span>
          </button>

          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-name">Juli</span>
            <span className="navbar__logo-sub">Tattoo Studio</span>
          </Link>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `navbar__cart-pill ${isActive ? "navbar__cart-pill--active" : ""}`
            }
          >
            <span>Carrito</span>
            <span className="navbar__cart-count">{totalItems}</span>
          </NavLink>
        </div>
      </header>

      <div
        className={`navbar__overlay ${
          isMenuOpen ? "navbar__overlay--visible" : ""
        }`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />

      <nav
        id="site-drawer"
        className={`navbar__drawer ${isMenuOpen ? "navbar__drawer--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="navbar__drawer-header">
          <div>
            <p className="navbar__eyebrow">Navegacion</p>
            <Link to="/" className="navbar__drawer-brand" onClick={closeMenu}>
              Juli Tattoo
            </Link>
          </div>

          <button
            type="button"
            className="navbar__drawer-close"
            onClick={closeMenu}
            aria-label="Cerrar menu"
          >
            Cerrar
          </button>
        </div>

        <div className="navbar__drawer-intro">
          <p className="navbar__drawer-title">Menu principal</p>
          <p className="navbar__drawer-copy">
            La navegacion vive en la bambalina y el carrito queda resuelto en el
            checkout, sin invadir el resto de la web.
          </p>
        </div>

        <ul className="navbar__drawer-links">
          {navItems.map((item, index) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `navbar__drawer-link ${
                    isActive ? "navbar__drawer-link--active" : ""
                  }`
                }
                onClick={closeMenu}
              >
                <span className="navbar__drawer-index">0{index + 1}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            `navbar__drawer-cart ${
              isActive ? "navbar__drawer-cart--active" : ""
            }`
          }
          onClick={closeMenu}
        >
          <span>{totalItems > 0 ? "Carrito / Checkout" : "Ir al checkout"}</span>
          <span className="navbar__drawer-cart-count">{totalItems}</span>
        </NavLink>

        <div className="navbar__drawer-footer">
          <span className="navbar__footer-pill">Checkout</span>
          <p className="navbar__footer-copy">
            El resumen del pedido vive dentro de checkout para no estorbar en las
            demas paginas.
          </p>
        </div>
      </nav>
    </>
  );
}
