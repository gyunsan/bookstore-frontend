import React, { useEffect, useRef } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/hooks/use-toast";

export const Cart = () => {
  const { isOpen, toggleCart, items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const cartRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);

  const handleSubmit = () => {
    toast({
      title: "Order Submitted",
      description: "Your order has been successfully submitted!",
    });
    clearCart();
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed right-4 bottom-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <ShoppingCart size={24} />
      </button>

      <div ref={cartRef} className={`cart-sidebar ${isOpen ? 'open' : 'closed'} z-40 p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-bold">Shopping Cart</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full"
              >
                Submit Order
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};