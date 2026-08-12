import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <CartProvider>
        <App />
      </CartProvider>
    </ClerkProvider>
  </StrictMode>
);