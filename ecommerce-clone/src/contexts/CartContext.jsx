import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

      const addToCart = (product) => {
        setCart((prev) => {
          const exists = prev.find((item) => item.id === product.id);
          if (exists) {
            return prev.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
          }
          return [...prev, { ...product, qty: 1 }];
        });
      };

      const removeFromCart = (id) => {
        setCart((prev) =>
          prev
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0) // remove if qty = 0
        );
      };


  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
