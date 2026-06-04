import { useState } from "react";
import { useCart } from "../../context/useCart";

const formatPrices = {
  A4: 15000,
  A3: 28000,
  "50x70": 35000,
};

export default function ProductCard({ product, onPreview }) {
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState("");
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(selectedFormat ? formatPrices[selectedFormat] : product.price);

  const handleAddToCart = () => {
    if (!selectedFormat) {
      alert("Selecciona un formato");
      return;
    }

    addToCart({
      ...product,
      size: selectedFormat,
      price: formatPrices[selectedFormat],
    });
  };

  return (
    <article className="product-card">
      <button
        className="product-card__media"
        type="button"
        onClick={onPreview}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img src={product.image} alt={product.name} />
        <span className="product-card__media-hint">Ver detalle</span>
      </button>

      <div className="product-card__body">
        <div className="product-card__heading">
          <h3>{product.name}</h3>
          <p>{formattedPrice}</p>
        </div>

        <div className="product-card__formats" aria-label="Formatos">
          {product.formats.map((format) => (
            <button
              className={
                selectedFormat === format
                  ? "product-card__format product-card__format--active"
                  : "product-card__format"
              }
              key={format}
              type="button"
              aria-pressed={selectedFormat === format}
              onClick={() => setSelectedFormat(format)}
            >
              {format}
            </button>
          ))}
        </div>

        <button
          className="product-card__add"
          type="button"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
