function OrderCard({ order }) {
  const itemCount = Array.isArray(order.items)
    ? order.items.reduce((total, item) => total + Number(item.quantity || 0), 0)
    : 0;

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : order.date || "Today";

  const totalLabel = typeof order.total === "number"
    ? `PKR ${order.total.toLocaleString()}`
    : order.total || "PKR 0";

  const statusClass = String(order.status || "Pending").toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="order-card">
      <div className="order-header-row">
        <div>
          <p className="muted-label">Order ID</p>
          <h4>{order.orderNumber || order.id}</h4>
        </div>
        <span className={`status-pill ${statusClass}`}>{order.status || "Pending"}</span>
      </div>

      <div className="order-contents">
        <div>
          <p className="muted-label">Items</p>
          <strong>{itemCount} item{itemCount === 1 ? "" : "s"}</strong>
        </div>
        <div>
          <p className="muted-label">Date</p>
          <strong>{orderDate}</strong>
        </div>
        <div>
          <p className="muted-label">Total</p>
          <strong>{totalLabel}</strong>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
