import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            className: "farmhub-toast",
            style: {
              background: "#173b20",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
      </CartProvider>
    </ClerkProvider>
  </StrictMode>
);