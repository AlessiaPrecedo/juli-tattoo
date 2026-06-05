import ProductGrid from "../components/Product/ProductGrid";
import "../styles/Prints.css";

export default function Prints() {
  return (
    <main className="prints-page">
      <section className="prints-page__hero">
        <p className="prints-page__eyebrow">
          PINTURAS ORIGINALES & OBJETOS ÚNICOS{" "}
        </p>
        <h1>Arte para llevar</h1>
        <p className="prints-page__intro">
          Ilustraciones impresas en formatos seleccionados. Elegi el tamaño,
          sumalo al carrito y coordinamos el envio.
        </p>
      </section>

      <ProductGrid />
    </main>
  );
}
