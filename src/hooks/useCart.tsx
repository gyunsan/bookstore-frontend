import React, { createContext, useContext, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  toggleCart: () => void;
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (book: Book) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === book.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...book, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(currentItems =>
      quantity === 0
        ? currentItems.filter(item => item.id !== id)
        : currentItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};