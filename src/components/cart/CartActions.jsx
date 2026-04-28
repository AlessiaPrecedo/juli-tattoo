import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";

export default function CartActions({ onClose }) {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();

  const handleCheckout = () => {
    onClose?.();
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    onClose?.();
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
      >
        Ir al checkout
      </button>

      <button
        onClick={handleContinueShopping}
        className="w-full border py-3 rounded-xl"
      >
        Seguir comprando
      </button>

      <button onClick={clearCart} className="w-full text-sm text-red-500">
        Vaciar carrito
      </button>
    </div>
  );
}
