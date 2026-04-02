import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__top">
      <div className="footer__brand">
        <span className="footer__logo-name">Juli</span>
        <span className="footer__logo-sub">tattoo</span>
        <p className="footer__tagline">Arte permanente · Buenos Aires</p>
      </div>

      <nav className="footer__nav">
        <p className="section-label">Navegación</p>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/galeria">Galería</Link>
          </li>
          <li>
            <Link to="/prints">Prints</Link>
          </li>
          <li>
            <Link to="/preguntas">FAQ</Link>
          </li>
        </ul>
      </nav>

      <div className="footer__contact">
        <p className="section-label">Contacto</p>
        <ul>
          <li>
            <a
              href="https://wa.me/549XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/USUARIO"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a href="mailto:hola@julitattoo.com">Email</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="footer__line" />
      <p className="footer__copy">
        © {new Date().getFullYear()} Juli Tattoo — Todos los derechos
        reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
