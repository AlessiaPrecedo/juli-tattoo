import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import "../styles/galeria.css";
import "../styles/Home.css";

/* ── Sección: Sobre mí ── */
const SobreMi = () => (
  <section className="sobre-mi" id="sobre-mi">
    <div className="sobre-mi__inner">
      {/* Foto */}
      <div className="sobre-mi__img-wrap">
        <div className="sobre-mi__img-frame">
          <img
            src="https://placehold.co/480x600/1a1a1a/333?text=foto"
            alt="Juli tatuadora"
            className="sobre-mi__img"
          />
        </div>
        <div className="sobre-mi__img-deco" />
      </div>

      {/* Texto */}
      <div className="sobre-mi__text">
        <p className="section-label">Sobre mí</p>
        <div className="gold-line" />
        <h2 className="sobre-mi__title">
          Hola, soy <em>Juli</em>
        </h2>
        <p className="sobre-mi__body">
          Tatuadora independiente con base en Buenos Aires. Me especializo en
          diseños con línea fina, ilustración y elementos orgánicos. Cada
          tatuaje es un proyecto único pensado junto a vos, desde el boceto
          hasta la aguja.
        </p>
        <p className="sobre-mi__body">
          Trabajo en estudio propio con materiales de primera calidad y estricto
          protocolo de higiene.
        </p>
        <a
          href="https://wa.me/549XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="home-btn home-btn--gold"
        >
          Hablemos de tu idea
        </a>
      </div>
    </div>
  </section>
);

/* ── Sección: Preview Galería ── */
const GaleriaPreview = () => {
  const items = [1, 2, 3, 4, 5, 6];
  return (
    <section className="galeria-preview">
      <div className="galeria-preview__header">
        <div>
          <p className="section-label">Portfolio</p>
          <h2 className="galeria-preview__title">Trabajos recientes</h2>
        </div>
        <Link to="/galeria" className="home-btn home-btn--ghost">
          Ver todo
        </Link>
      </div>

      <div className="galeria-preview__grid">
        {items.map((i) => (
          <div key={i} className="galeria-preview__item">
            <img
              src={`https://placehold.co/400x500/1a1a1a/2a2a2a?text=tatuaje+${i}`}
              alt={`Trabajo ${i}`}
            />
            <div className="galeria-preview__hover">
              <span>Ver más</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Sección: Prints ── */
const PrintsPreview = () => (
  <section className="prints-preview">
    <div className="prints-preview__inner">
      <div className="prints-preview__text">
        <p className="section-label">Colección</p>
        <div className="gold-line" />
        <h2 className="prints-preview__title">
          Prints <em>disponibles</em>
        </h2>
        <p className="prints-preview__body">
          Diseños originales para imprimir, enmarcar y coleccionar. Arte de
          estudio para llevar a tu espacio.
        </p>
        <Link to="/prints" className="home-btn home-btn--gold">
          Ver prints
        </Link>
      </div>

      <div className="prints-preview__imgs">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`prints-preview__img prints-preview__img--${i}`}
          >
            <img
              src={`https://placehold.co/300x380/111/222?text=print+${i}`}
              alt={`Print ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Home ── */
const Home = () => (
  <main className="home">
    <Hero />
    <GaleriaPreview />
    <SobreMi />
    <PrintsPreview />
  </main>
);

export default Home;
