import { useCart } from "../../context/useCart";

export default function PaymentButton({ disabled }) {
  const { cartItems } = useCart();

  const handlePayment = async () => {
    try {
      if (cartItems.length === 0) {
        alert("No hay productos en el carrito para iniciar el pago");
        return;
      }

      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
        }),
      });

      const raw = await res.text();
      let data = {};

      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(
            `La API devolvio una respuesta invalida (${res.status}).`,
          );
        }
      }

      if (!res.ok) {
        throw new Error(
          data.error ||
            `Error creando la preferencia de pago (${res.status})`,
        );
      }

      if (!raw) {
        throw new Error(
          "La API /api/create-preference no respondio datos. En local, revisa si el backend/API esta levantado.",
        );
      }

      if (!data.initPoint) {
        throw new Error("Mercado Pago no devolvio el enlace de pago");
      }

      window.location.href = data.initPoint;
    } catch (error) {
      console.error("Error Mercado Pago:", error);
      alert(`No se pudo iniciar el pago: ${error.message}`);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handlePayment}
      style={{
        border: "1px solid #c9a84c",
        background: disabled ? "#3a3a3a" : "#c9a84c",
        color: disabled ? "#f5f0eb" : "#0a0a0a",
        borderRadius: "0.75rem",
        padding: "0.9rem 1.1rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      Continuar al pago
    </button>
  );
}
