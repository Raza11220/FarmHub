import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import DashboardSidebar from "../components/DashboardSidebar";
import ProfileCard from "../components/ProfileCard";
import OrderCard from "../components/OrderCard";
import WishlistCard from "../components/WishlistCard";
import { useCart } from "../context/CartContext";

const wishlist = [
  { emoji: "🐄", name: "Bella", breed: "Sahiwal Cow", price: "PKR 285,000" },
  { emoji: "🐐", name: "Rosy", breed: "Beetal Goat", price: "PKR 32,000" },
  { emoji: "🐑", name: "Sultan", breed: "Kajli Sheep", price: "PKR 55,000" },
];

function Dashboard() {
  const { user } = useUser();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState("profile");

  const customerName = user?.fullName || "FarmHub Customer";
  const customerEmail = user?.primaryEmailAddress?.emailAddress || "you@farmhub.com";
  const phone = user?.phoneNumbers?.[0]?.phoneNumber || "+92 300 0000000";
  const location = "Lahore, Pakistan";

  const savedAddresses = orders.length > 0
    ? orders.slice(0, 3).map((order) => {
        const address = order.shippingAddress || {};
        return `${address.address || "Farm address"}, ${address.city || "Lahore"}, Pakistan`;
      })
    : ["House 14, Gulberg, Lahore", "Farm Lane, Sheikhupura Road, Lahore"];

  const notifications = orders.length > 0
    ? orders.slice(0, 3).map((order) => {
        return `Order ${order.orderNumber || order.id} is now marked as ${order.status || "Pending"}.`;
      })
    : [
        "Your order FH-1024 has been delivered successfully.",
        "New livestock matching your preferences is now available.",
        "Payment confirmation was received for your recent purchase.",
      ];

  const recentOrders = orders.length > 0 ? orders.slice(0, 3) : [
    { id: "FH-1024", orderNumber: "FH-1024", items: [{ quantity: 2 }], total: 310000, status: "Delivered", createdAt: "2026-08-12T00:00:00.000Z" },
    { id: "FH-1048", orderNumber: "FH-1048", items: [{ quantity: 1 }], total: 145000, status: "In Transit", createdAt: "2026-07-30T00:00:00.000Z" },
    { id: "FH-1090", orderNumber: "FH-1090", items: [{ quantity: 3 }], total: 420000, status: "Processing", createdAt: "2026-07-14T00:00:00.000Z" },
  ];

  const settingsOptions = [
    { label: "Email notifications", value: "On" },
    { label: "SMS alerts", value: "On" },
    { label: "Two-factor authentication", value: "Protected" },
    { label: "Default currency", value: "PKR" },
  ];

  const renderSection = () => {
    if (activeTab === "profile") {
      return (
        <div className="dashboard-main-column">
          <ProfileCard name={customerName} email={customerEmail} phone={phone} location={location} />

          <div className="panel-card">
            <div className="panel-header-row">
              <h3>Order History</h3>
              <button type="button" className="text-btn" onClick={() => setActiveTab("orders")}>See all</button>
            </div>

            <div className="stack-list">
              {recentOrders.map((order) => (
                <OrderCard key={order.orderNumber || order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "orders") {
      return (
        <div className="dashboard-main-column">
          <div className="panel-card">
            <div className="panel-header-row">
              <h3>My Orders</h3>
              <button type="button" className="text-btn" onClick={() => setActiveTab("profile")}>Back</button>
            </div>

            <div className="stack-list">
              {recentOrders.map((order) => (
                <OrderCard key={order.orderNumber || order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "wishlist") {
      return (
        <div className="dashboard-main-column">
          <div className="panel-card">
            <div className="panel-header-row">
              <h3>Wishlist</h3>
              <button type="button" className="text-btn" onClick={() => setActiveTab("profile")}>Manage</button>
            </div>

            <div className="stack-list compact">
              {wishlist.map((item) => (
                <WishlistCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "addresses") {
      return (
        <div className="dashboard-main-column">
          <div className="panel-card">
            <div className="panel-header-row">
              <h3>Saved Addresses</h3>
              <button type="button" className="text-btn">Add</button>
            </div>

            <ul className="info-list">
              {savedAddresses.map((address) => (
                <li key={address}>{address}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (activeTab === "notifications") {
      return (
        <div className="dashboard-main-column">
          <div className="panel-card">
            <div className="panel-header-row">
              <h3>Notifications</h3>
              <button type="button" className="text-btn">Mark all</button>
            </div>

            <ul className="info-list">
              {notifications.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-main-column">
        <div className="panel-card">
          <div className="panel-header-row">
            <h3>Account Settings</h3>
          </div>

          <div className="settings-list">
            {settingsOptions.map((setting) => (
              <div key={setting.label} className="setting-row">
                <span>{setting.label}</span>
                <button type="button" className="setting-toggle">
                  {setting.value}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const sideCards = (
    <div className="dashboard-side-column">
      <div className="panel-card">
        <div className="panel-header-row">
          <h3>Wishlist</h3>
          <button type="button" className="text-btn" onClick={() => setActiveTab("wishlist")}>Manage</button>
        </div>

        <div className="stack-list compact">
          {wishlist.map((item) => (
            <WishlistCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-header-row">
          <h3>Saved Addresses</h3>
          <button type="button" className="text-btn" onClick={() => setActiveTab("addresses")}>Add</button>
        </div>

        <ul className="info-list">
          {savedAddresses.map((address) => (
            <li key={address}>{address}</li>
          ))}
        </ul>
      </div>

      <div className="panel-card">
        <div className="panel-header-row">
          <h3>Notifications</h3>
          <button type="button" className="text-btn" onClick={() => setActiveTab("notifications")}>Mark all</button>
        </div>

        <ul className="info-list">
          {notifications.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const headerTitle = {
    profile: "Dashboard",
    orders: "Orders",
    wishlist: "Wishlist",
    addresses: "Addresses",
    notifications: "Notifications",
    settings: "Settings",
  }[activeTab];

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <DashboardSidebar activeTab={activeTab} onSelect={setActiveTab} />

        <section className="dashboard-content">
          <header className="dashboard-header">
            <div>
              <p className="muted-label">Welcome back</p>
              <h1>{headerTitle}</h1>
            </div>
            <button type="button" className="primary-btn dashboard-btn">View Inventory</button>
          </header>

          <div className="dashboard-grid">
            {renderSection()}
            {activeTab === "profile" ? sideCards : null}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
