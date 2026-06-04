import { Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
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
          Tatuadora independiente de Buenos Aires. Desde que tengo uso de razón
          me gustó pintar y, por suerte, en casa nunca faltó un pincel. Me
          especializo en tatuajes a color y disfruto trabajar cada diseño de
          manera personalizada, porque creo que cada idea merece una pieza
          única. Mi objetivo es que te lleves un tattoo que te represente y te
          acompañe en el tiempo. Actualmente tatuo en Lomitas, Avellaneda y CABA
          (San Telmo).
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
  const images = ["../tattoo/tattoo1.jpg", "../tattoo/tattoo2.jpg"];
  return (
    <section className="galeria-preview">
      <div className="galeria-preview__header">
        <div>
          <p className="section-label">Portfolio</p>
          <h2 className="galeria-preview__title">Trabajos recientes</h2>
        </div>
      </div>

      <div className="galeria-preview__grid">
        {images.map((image, i) => (
          <div key={image} className="galeria-preview__item">
            <img src={image} alt={`Trabajo ${i + 1}`} />
            <div className="galeria-preview__hover">
              <Link to="/galeria">Ver mas</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Sección: Prints ── */
const PrintsPreview = () => {
  const imgs = ["/prints/michi.jpg"];

  return (
    <section className="prints-preview">
      <div className="prints-preview__inner">
        <div className="prints-preview__text">
          <p className="section-label">Colección</p>
          <div className="gold-line" />
          <h2 className="prints-preview__title">
            Prints <em>Disponibles</em>
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
          {imgs.map((img, i) => (
            <Link
              to="/prints"
              key={img}
              className={`prints-preview__img prints-preview__img--${i}`}
              aria-label="Ver prints disponibles"
            >
              <img src={img} alt={`Print ${i + 1}`} />
              <div className="galeria-preview__hover">
                <span>Ver mas</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

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
