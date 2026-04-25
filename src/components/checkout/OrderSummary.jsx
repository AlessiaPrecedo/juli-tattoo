import { useCart } from "../../context/useCart";

export default function OrderSummary() {
  const { cartItems, subtotal, total, clearCart, removeFromCart } = useCart();

  const formatPrice = (value) =>
    value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">Resumen del pedido</h2>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Vaciar carrito
          </button>
        )}
      </div>

      <div className="space-y-3">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            Tu carrito esta vacio. Agrega productos para continuar con la compra.
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Talle: {item.size} · Cantidad: {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="rounded-full p-2 text-lg leading-none transition hover:bg-red-50"
                  aria-label={`Eliminar ${item.name} del carrito`}
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-3">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
