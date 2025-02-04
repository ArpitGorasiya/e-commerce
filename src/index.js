import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartWishlistProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartWishlistProvider>
    <App />
  </CartWishlistProvider>
);
