import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "farmhub-cart";
const ORDER_STORAGE_KEY = "farmhub-orders";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (animal) => {
    setCartItems((currentItems) => {
      const exists = currentItems.find((item) => item.id === animal.id);

      if (exists) {
        return currentItems.map((item) =>
          item.id === animal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...animal,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = (orderData) => {
    const order = {
      id: orderData.id || `FH-${Date.now()}`,
      orderNumber: orderData.orderNumber || `FH-${Date.now()}`,
      status: orderData.status || "Pending",
      paymentStatus: orderData.paymentStatus || "Pending",
      paymentMethod: orderData.paymentMethod || "cod",
      subtotal: Number(orderData.subtotal) || 0,
      deliveryCharges: Number(orderData.deliveryCharges) || 0,
      discount: Number(orderData.discount) || 0,
      total: Number(orderData.total) || 0,
      createdAt: orderData.createdAt || new Date().toISOString(),
      items: orderData.items || [],
      shippingAddress: orderData.shippingAddress || {},
      billingAddress: orderData.billingAddress || {},
      customerName: orderData.customerName || "FarmHub Customer",
      customerEmail: orderData.customerEmail || "customer@farmhub.com",
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setCartItems([]);
    return order;
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        placeOrder,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}