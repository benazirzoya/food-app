import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // =========================
  // TOGGLE WISHLIST
  // =========================
  const toggleWishlist = (food) => {
    const existing = wishlist.find((item) => item.id === food.id);
    if (existing) {
      setWishlist(wishlist.filter((item) => item.id !== food.id));
      alert(`${food.name} removed from wishlist ❤️`);
    } else {
      setWishlist([...wishlist, food]);
      alert(`${food.name} added to wishlist ❤️`);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (food) => {

    const existing = cart.find((item) => item.id === food.id);

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);

    }

    alert(`${food.name} added to cart 🛒`);
  };

  // =========================
  // REMOVE
  // =========================

  const removeFromCart = (id) => {

    setCart(cart.filter((item) => item.id !== id));

  };

  // =========================
  // INCREASE
  // =========================

  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  };

  // =========================
  // DECREASE
  // =========================

  const decreaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  };

  const clearCart = () => {
    setCart([]);
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        wishlist,
        toggleWishlist,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}