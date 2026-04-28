import { useCart } from "../../context/useCart";

export default function CartSummary() {
  const { subtotal, total } = useCart();

  const formatPrice = (value) =>
    value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="text-sm">
        <span>envio a coordinar con el vendedor</span>
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
