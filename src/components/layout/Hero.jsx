import { Link } from "react-router-dom";
import "../../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__overlay" />
      </div>

      <div className="hero__line hero__line--left" />
      <div className="hero__line hero__line--right" />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-thin">✿ JULIETA BRZ ✿</span>
          <span className="hero__title-italic">Tattoo & Merch</span>
        </h1>

        <p className="hero__subtitle">
          TATUAJES PERSONALIZADOS
          <br />
          LINEA FINA, ILUSTRACION Y COMPOSICIONES ORGANICAS
        </p>

        <div className="hero__actions">
          <a
            href="https://wa.me/5490000000000"
            target="_blank"
            rel="noreferrer"
            className="hero__btn hero__btn--primary"
          >
            Reservar turno
          </a>
          <Link to="/galeria" className="hero__btn hero__btn--ghost">
            Ver galeria
          </Link>
        </div>
      </div>
    </section>
  );
}
