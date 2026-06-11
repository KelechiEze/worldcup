import { motion } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const total = cartItems.reduce((acc, item) => {
    const rawPrice = typeof item.product.price === "string" 
      ? parseFloat(item.product.price.replace("$", "")) 
      : item.product.price;
    return acc + rawPrice * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xs"
        id="cart-backdrop"
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full rounded-l-[32px] overflow-hidden border-l border-cream-dark"
          id="cart-panel"
        >
          {/* Header */}
          <div className="p-6 border-b border-cream-dark bg-cream/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-brand-green" />
              <h2 className="text-xl font-bold font-display text-neutral-800">Your Basket</h2>
              <span className="bg-brand-green/10 text-brand-green text-xs font-semibold px-2.5 py-1 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} tubs
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-cream-dark transition-all duration-300 text-neutral-500 hover:text-neutral-900"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-cream/20">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12" id="cart-empty-state">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4 text-brand-green">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-display text-neutral-700">Empty scoop!</h3>
                <p className="text-neutral-500 text-sm mt-1 max-w-xs">
                  A perfect day starts with delicious ice cream. Fill your tub with amazing flavors!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 font-semibold text-xs text-white bg-brand-green hover:bg-brand-green-light px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  Start Adding
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const rawPrice = typeof item.product.price === "string"
                  ? parseFloat(item.product.price.replace("$", ""))
                  : item.product.price;
                return (
                  <motion.div
                    key={item.product.id}
                    layoutId={`cart-item-${item.product.id}`}
                    className="flex bg-white border border-cream-dark rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow gap-4"
                    id={`cart-item-card-${item.product.id}`}
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-cream/50 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-cream-dark">
                      <img
                        referrerPolicy="no-referrer"
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain transform hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-neutral-800 text-sm">{item.product.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500">{item.product.flavor}</p>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <span className="font-bold text-brand-green text-sm">
                          ${(rawPrice * item.quantity).toFixed(2)}
                        </span>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center border border-cream-dark rounded-full bg-cream/30 px-1 py-0.5 scale-90">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 rounded-full text-neutral-500 hover:bg-white hover:text-neutral-900 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 rounded-full text-neutral-500 hover:bg-white hover:text-neutral-900 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-cream-dark bg-cream/75 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-600 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-brand-green font-display">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-neutral-500 text-xs mb-6">
                Shipping, taxes and custom dry ice coolers calculated at checkout.
              </p>
              <button
                onClick={() => {
                  alert(`Thank you! Creamy is now preparing your delicious sequence of ice creams for delivery! Total: $${total.toFixed(2)}`);
                  onClose();
                }}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-brand-green/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                id="cart-checkout-btn"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                Proceed to Checkout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
