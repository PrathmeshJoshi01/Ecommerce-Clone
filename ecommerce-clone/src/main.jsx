import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster position="top-right" />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
