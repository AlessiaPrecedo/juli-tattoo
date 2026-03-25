import "../styles/galeria.css";

const images = [
  "/images/tattoo1.jpg",
  "/images/tattoo2.jpg",
  "/images/tattoo3.jpg",
  "/images/tattoo4.jpg",
  "/images/tattoo5.jpg",
  "/images/tattoo6.jpg",
];

export default function Galeria() {
  return (
    <div className="galeria">
      {/* HEADER */}
      <section className="galeria__hero">
        <div className="galeria__ornament galeria__ornament--top">
          <span>✦</span>
          <span className="galeria__ornament-line" />
          <span>✦</span>
        </div>

        <span className="galeria__section-label">Portfolio</span>
        <h1 className="galeria__title">Galería</h1>
        <p className="galeria__subtitle">
          Una selección de mis trabajos recientes
        </p>

        <div className="galeria__ornament galeria__ornament--bottom">
          <span>✦</span>
          <span className="galeria__ornament-line" />
          <span>✦</span>
        </div>
      </section>

      {/* GRID */}
      <section className="galeria__grid">
        {images.map((src, i) => (
          <div key={i} className="galeria__item">
            <img src={src} alt={`Tattoo ${i + 1}`} />
            <div className="galeria__overlay">
              <span>Ver</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

