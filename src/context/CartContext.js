import React, { createContext, useContext, useState } from "react";

const CartWishlistContext = createContext();

const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState(getFromLocalStorage("cart"));
  const [wishlist, setWishlist] = useState(getFromLocalStorage("wishlist"));

  const addToCart = (product) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== product.id);
      setToLocalStorage("wishlist", updatedWishlist);
      return updatedWishlist;
    });

    setCart((prev) => {
      const updatedCart = [...prev, product];
      setToLocalStorage("cart", updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updatedCart = prev.filter((product) => product.id !== productId);
      setToLocalStorage("cart", updatedCart);
      return updatedCart;
    });
  };

  const isInCart = (productId) => {
    return cart.some((product) => product.id === productId);
  };

  const addToWishlist = (product) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== product.id);
      setToLocalStorage("cart", updatedCart);
      return updatedCart;
    });

    setWishlist((prev) => {
      const updatedWishlist = [...prev, product];
      setToLocalStorage("wishlist", updatedWishlist);
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter(
        (product) => product.id !== productId
      );
      setToLocalStorage("wishlist", updatedWishlist);
      return updatedWishlist;
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((product) => product.id === productId);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        isInCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => useContext(CartWishlistContext);
