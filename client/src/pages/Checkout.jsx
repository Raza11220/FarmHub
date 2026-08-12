import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Banknote, CheckCircle2, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const paymentOptions = [
  { id: "cod", label: "Cash On Delivery", icon: "💵" },
  { id: "stripe", label: "Stripe Ready", icon: "💳" },
  { id: "jazzcash", label: "JazzCash Ready", icon: "📱" },
  { id: "easypaisa", label: "EasyPaisa Ready", icon: "📲" },
];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  shippingAddress: "",
  shippingCity: "",
  shippingZip: "",
  shippingCountry: "Pakistan",
  billingSameAsShipping: true,
  billingAddress: "",
  billingCity: "",
  billingZip: "",
  paymentMethod: "cod",
};

function Checkout() {
  const { cartItems, subtotal, placeOrder } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const deliveryCharges = subtotal === 0 ? 0 : subtotal >= 50000 ? 0 : 500;
  const discount = subtotal >= 80000 ? 1200 : 0;
  const grandTotal = Math.max(subtotal + deliveryCharges - discount, 0);

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.shippingAddress.trim()) nextErrors.shippingAddress = "Shipping address is required.";
    if (!formData.shippingCity.trim()) nextErrors.shippingCity = "Shipping city is required.";
    if (!formData.shippingZip.trim()) nextErrors.shippingZip = "Shipping ZIP code is required.";

    if (!formData.billingSameAsShipping) {
      if (!formData.billingAddress.trim()) nextErrors.billingAddress = "Billing address is required.";
      if (!formData.billingCity.trim()) nextErrors.billingCity = "Billing city is required.";
      if (!formData.billingZip.trim()) nextErrors.billingZip = "Billing ZIP code is required.";
    }

    if (!formData.paymentMethod) nextErrors.paymentMethod = "Please choose a payment method.";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const orderId = `FH-${Date.now().toString().slice(-6)}`;
    const shippingAddress = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.shippingAddress,
      city: formData.shippingCity,
      zipCode: formData.shippingZip,
      country: formData.shippingCountry,
    };

    const billingAddress = formData.billingSameAsShipping
      ? {
          sameAsShipping: true,
          address: formData.shippingAddress,
          city: formData.shippingCity,
          zipCode: formData.shippingZip,
        }
      : {
          sameAsShipping: false,
          address: formData.billingAddress,
          city: formData.billingCity,
          zipCode: formData.billingZip,
        };

    const createdOrder = placeOrder({
      id: orderId,
      orderNumber: orderId,
      subtotal,
      deliveryCharges,
      discount,
      total: grandTotal,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Awaiting Payment",
      status: "Pending",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
        breed: item.breed,
      })),
      shippingAddress,
      billingAddress,
      customerName: user?.fullName || formData.fullName,
      customerEmail: user?.primaryEmailAddress?.emailAddress || formData.email,
    });

    setFormData(initialForm);
    alert(`✅ Order ${createdOrder.orderNumber} placed successfully. Our team will confirm your shipment details shortly.`);
    navigate("/dashboard", { replace: true });
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page empty-checkout-shell">
        <div className="empty-checkout-box">
          <div className="empty-checkout-icon">
            <Truck size={42} />
          </div>
          <span className="empty-checkout-kicker">Checkout</span>
          <h1>Your cart is empty</h1>
          <p>Add livestock to your cart before placing an order.</p>
          <Link to="/livestock" className="primary-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <div>
          <span className="section-label">Secure Checkout</span>
          <h1>Complete Your Order</h1>
        </div>
        <div className="checkout-status">
          <CheckCircle2 size={18} />
          {itemCount} item{itemCount > 1 ? "s" : ""} ready for dispatch
        </div>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        <div className="checkout-main">
          <section className="checkout-panel">
            <div className="panel-heading">
              <MapPin size={18} />
              <h2>Shipping Address</h2>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03xx xxxxxxx"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="field field-full">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="field field-full">
                <label htmlFor="shippingAddress">Street Address</label>
                <input
                  id="shippingAddress"
                  name="shippingAddress"
                  type="text"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  placeholder="House No, Street, Area"
                />
                {errors.shippingAddress && <span className="error-text">{errors.shippingAddress}</span>}
              </div>

              <div className="field">
                <label htmlFor="shippingCity">City</label>
                <input
                  id="shippingCity"
                  name="shippingCity"
                  type="text"
                  value={formData.shippingCity}
                  onChange={handleChange}
                  placeholder="Lahore"
                />
                {errors.shippingCity && <span className="error-text">{errors.shippingCity}</span>}
              </div>

              <div className="field">
                <label htmlFor="shippingZip">ZIP Code</label>
                <input
                  id="shippingZip"
                  name="shippingZip"
                  type="text"
                  value={formData.shippingZip}
                  onChange={handleChange}
                  placeholder="54000"
                />
                {errors.shippingZip && <span className="error-text">{errors.shippingZip}</span>}
              </div>

              <div className="field field-full">
                <label htmlFor="shippingCountry">Country</label>
                <input
                  id="shippingCountry"
                  name="shippingCountry"
                  type="text"
                  value={formData.shippingCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="checkout-panel">
            <div className="panel-heading">
              <ShieldCheck size={18} />
              <h2>Billing Address</h2>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="billingSameAsShipping"
                checked={formData.billingSameAsShipping}
                onChange={handleChange}
              />
              <span>Same as shipping address</span>
            </label>

            {!formData.billingSameAsShipping && (
              <div className="form-grid billing-grid">
                <div className="field field-full">
                  <label htmlFor="billingAddress">Billing Address</label>
                  <input
                    id="billingAddress"
                    name="billingAddress"
                    type="text"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    placeholder="Billing street address"
                  />
                  {errors.billingAddress && <span className="error-text">{errors.billingAddress}</span>}
                </div>

                <div className="field">
                  <label htmlFor="billingCity">Billing City</label>
                  <input
                    id="billingCity"
                    name="billingCity"
                    type="text"
                    value={formData.billingCity}
                    onChange={handleChange}
                    placeholder="Karachi"
                  />
                  {errors.billingCity && <span className="error-text">{errors.billingCity}</span>}
                </div>

                <div className="field">
                  <label htmlFor="billingZip">Billing ZIP</label>
                  <input
                    id="billingZip"
                    name="billingZip"
                    type="text"
                    value={formData.billingZip}
                    onChange={handleChange}
                    placeholder="75200"
                  />
                  {errors.billingZip && <span className="error-text">{errors.billingZip}</span>}
                </div>
              </div>
            )}
          </section>

          <section className="checkout-panel payment-panel">
            <div className="panel-heading">
              <CreditCard size={18} />
              <h2>Payment Method</h2>
            </div>

            <div className="payment-options">
              {paymentOptions.map((payment) => (
                <label
                  key={payment.id}
                  className={
                    formData.paymentMethod === payment.id
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={payment.id}
                    checked={formData.paymentMethod === payment.id}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">{payment.icon}</span>
                  <span>{payment.label}</span>
                </label>
              ))}
            </div>

            {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
          </section>
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-products">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-product-row">
                <div className="summary-product-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      Qty {item.quantity} · PKR {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <strong>PKR {(item.price * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
          </div>

          <div className="summary-lines">
            <div>
              <span>Subtotal</span>
              <strong>PKR {subtotal.toLocaleString()}</strong>
            </div>

            <div>
              <span>Delivery Charges</span>
              <strong>
                {deliveryCharges === 0 ? "Free" : `PKR ${deliveryCharges.toLocaleString()}`}
              </strong>
            </div>

            <div>
              <span>Discount</span>
              <strong>- PKR {discount.toLocaleString()}</strong>
            </div>
          </div>

          <div className="summary-total">
            <span>Grand Total</span>
            <strong>PKR {grandTotal.toLocaleString()}</strong>
          </div>

          <div className="summary-note">
            <Banknote size={16} />
            Secure payments for livestock orders with verified farm sellers.
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;