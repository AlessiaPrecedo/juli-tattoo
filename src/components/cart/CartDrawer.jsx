import { useCart } from "../../context/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import CartActions from "./CartActions";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Tu carrito</h2>
        <button onClick={onClose}>x</button>
      </div>

      {/* Body */}
      <div className="flex flex-col h-[calc(100%-64px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <CartSummary />
            <CartActions onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}
