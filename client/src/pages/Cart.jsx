import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, TicketPercent } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const couponMap = {
  FARM10: 0.1,
  SAVE200: 200,
  WELCOME5: 0.05,
};

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    subtotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const deliveryCharges = subtotal === 0 ? 0 : subtotal >= 50000 ? 0 : 500;

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || !couponMap[appliedCoupon]) return 0;

    const rateOrAmount = couponMap[appliedCoupon];
    const computedDiscount =
      typeof rateOrAmount === "number" && rateOrAmount > 1
        ? rateOrAmount
        : subtotal * rateOrAmount;

    return Math.min(computedDiscount, subtotal);
  }, [appliedCoupon, subtotal]);

  const grandTotal = Math.max(subtotal + deliveryCharges - discountAmount, 0);

  const handleApplyCoupon = () => {
    const normalizedCode = couponInput.trim().toUpperCase();

    if (!normalizedCode || !couponMap[normalizedCode]) {
      setAppliedCoupon("");
      return;
    }

    setAppliedCoupon(normalizedCode);
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page empty-cart-shell">
        <div className="empty-cart-box">
          <div className="empty-cart-icon">
            <ShoppingBag size={42} />
          </div>

          <span className="empty-cart-kicker">Your cart is empty</span>
          <h1>Your farm basket feels empty.</h1>
          <p>
            Add healthy livestock from our marketplace to start building your dream farm.
          </p>

          <Link to="/livestock" className="primary-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header-row">
        <div>
          <span className="section-label">Shopping Cart</span>
          <h1>Your Cart</h1>
        </div>

        <button type="button" className="clear-cart-btn" onClick={clearCart}>
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items-panel">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-main">
                <div className="cart-item-topline">
                  <div>
                    <span className="cart-item-category">{item.category}</span>
                    <h3>{item.name}</h3>
                  </div>

                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <p className="cart-item-breed">{item.breed}</p>

                <div className="cart-item-meta">
                  <span className="price-tag">PKR {item.price.toLocaleString()}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-box" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <strong className="line-total">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary-panel">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>PKR {subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <strong>
              {deliveryCharges === 0 ? "Free" : `PKR ${deliveryCharges.toLocaleString()}`}
            </strong>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <strong>- PKR {discountAmount.toLocaleString()}</strong>
          </div>

          <div className="coupon-box">
            <label htmlFor="coupon">Coupon Code</label>
            <div className="coupon-input-row">
              <input
                id="coupon"
                type="text"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Enter code"
              />
              <button type="button" onClick={handleApplyCoupon}>
                <TicketPercent size={15} />
                Apply
              </button>
            </div>

            {appliedCoupon && (
              <p className="coupon-success">Applied coupon: {appliedCoupon}</p>
            )}
          </div>

          <div className="summary-total">
            <span>Grand Total</span>
            <strong>PKR {grandTotal.toLocaleString()}</strong>
          </div>

          <div className="summary-note">
            <Truck size={16} />
            {deliveryCharges === 0
              ? "Free delivery unlocked on this order."
              : "Delivery fee applied to this order."}
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;