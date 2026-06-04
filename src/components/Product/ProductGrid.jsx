import { useState } from "react";
import ProductCard from "./ProductCard";
import ImageLightbox from "../ui/ImageLightbox";

const products = [
  {
    id: 1,
    name: "Rani Tatuera",
    image: "/prints/ranita.jpg",
    formats: ["A4", "A3", "50x70"],
  },
  {
    id: 2,
    name: "Michi suerte",
    image: "/prints/michi.jpg",
    formats: ["A4", "A3"],
  },
];

export default function ProductGrid() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const productImages = products.map((product) => ({
    src: product.image,
    alt: product.name,
  }));

  return (
    <>
      <section className="product-grid" aria-label="Prints disponibles">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={() => setSelectedIndex(index)}
          />
        ))}
      </section>

      <ImageLightbox
        images={productImages}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
}
