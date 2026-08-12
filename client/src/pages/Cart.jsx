import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
   );

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/livestock" className="primary-btn">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.image}
            alt={item.name}
            width="120"
          />

          <div>
            <h3>{item.name}</h3>

            <p>{item.breed}</p>

            <h4>
              PKR {item.price.toLocaleString()}
            </h4>

            <button
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>s
        </div>
      ))}

      <div className="cart-summary">
        <h2>
            Total: PKR {totalPrice.toLocaleString()}
        </h2>

        <Link
            to="/checkout"
            className="primary-btn"
        >
            Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}

export default Cart;