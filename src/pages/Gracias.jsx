import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function Gracias() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const hasProcessedRef = useRef(false);
  const paymentId =
    searchParams.get("payment_id") ||
    searchParams.get("collection_id") ||
    "sin-id";

  useEffect(() => {
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;

    const rawOrder = sessionStorage.getItem("lastOrder");

    if (!rawOrder) {
      clearCart();
      return;
    }

    try {
      const orderData = JSON.parse(rawOrder);
      const items = Array.isArray(orderData.cartItems) ? orderData.cartItems : [];
      const checkoutData = orderData.checkoutData || {};

      if (items.length === 0 || !checkoutData.email) {
        clearCart();
        sessionStorage.removeItem("lastOrder");
        sessionStorage.removeItem("checkoutData");
        return;
      }

      clearCart();
      sessionStorage.removeItem("lastOrder");
      sessionStorage.removeItem("checkoutData");
    } catch (error) {
      console.error(`No se pudo procesar la orden ${paymentId}:`, error);
      clearCart();
      sessionStorage.removeItem("lastOrder");
      sessionStorage.removeItem("checkoutData");
    }
  }, [clearCart, paymentId]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "7.5rem 1rem 3rem",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 640,
          border: "1px solid #e7dccf",
          borderRadius: "1.5rem",
          padding: "2rem",
          textAlign: "center",
          background: "#fffaf5",
        }}
      >
        <p
          style={{
            margin: 0,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            color: "#8c6a43",
          }}
        >
          Pago aprobado
        </p>

        <h1 style={{ fontSize: "2.25rem", margin: "0.75rem 0 1rem" }}>
          Gracias por tu compra
        </h1>

        <p style={{ margin: "0 auto 1.5rem", maxWidth: 460, lineHeight: 1.7 }}>
          Tu pago fue recibido correctamente. En breve vas a poder seguir
          explorando la tienda o volver a la galeria. El envio se coordina
          directamente con el vendedor.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/prints"
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "0.75rem",
              background: "#c9a84c",
              color: "#0a0a0a",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Seguir comprando
          </Link>

          <Link
            to="/galeria"
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "0.75rem",
              border: "1px solid #c9a84c",
              color: "#5f4727",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver galeria
          </Link>
        </div>
      </section>
    </main>
  );
}
