import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background placeholder image */}
      <div className="hero__bg">
        <img
          src="https://placehold.co/1400x900/111111/333333?text=."
          alt="background"
          className="hero__bg-img"
        />
        <div className="hero__overlay" />
      </div>

      {/* Decorative lines */}
      <div className="hero__line hero__line--left" />
      <div className="hero__line hero__line--right" />

      {/* Content */}
      <div className="hero__content">
        <p className="section-label">Buenos Aires · Argentina</p>

        <h1 className="hero__title">
          <span className="hero__title-thin">Juli</span>
          <span className="hero__title-italic">Tattoo</span>
        </h1>

        <p className="hero__subtitle">
          Arte permanente hecho con intención.
          <br />
          Cada trazo cuenta una historia.
        </p>

        <div className="hero__actions">
          <Link to="/galeria" className="hero__btn hero__btn--primary">
            Ver trabajos
          </Link>
          <a
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--ghost"
          >
            Reservar turno
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
