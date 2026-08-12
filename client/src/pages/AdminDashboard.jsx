import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChartNoAxesCombined,
  CircleDollarSign,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  PawPrint,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Tags,
  TicketPercent,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ShoppingCart },
  { label: "Animals", icon: PawPrint },
  { label: "Users", icon: Users },
  { label: "Revenue", icon: CircleDollarSign },
  { label: "Coupons", icon: TicketPercent },
  { label: "Categories", icon: Tags },
  { label: "Reviews", icon: MessageSquareText },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Total Revenue", value: "PKR 4.8M", delta: "+18.2%", trend: "up", icon: CircleDollarSign },
  { label: "Orders", value: "1,248", delta: "+12.6%", trend: "up", icon: ShoppingCart },
  { label: "Animals Sold", value: "842", delta: "+8.4%", trend: "up", icon: PawPrint },
  { label: "Active Users", value: "6,930", delta: "-2.1%", trend: "down", icon: Users },
];

const revenueBars = [42, 58, 48, 72, 66, 84, 90, 80, 96, 88, 72, 98];

const orders = [
  { id: "FH-1024", customer: "Ayesha Khan", items: "2 animals", total: "PKR 310,000", status: "Delivered" },
  { id: "FH-1063", customer: "Bilal Ahmad", items: "1 animal", total: "PKR 145,000", status: "Processing" },
  { id: "FH-1091", customer: "Hamza Raza", items: "3 animals", total: "PKR 420,000", status: "In Transit" },
  { id: "FH-1108", customer: "Sara Ali", items: "2 animals", total: "PKR 260,000", status: "Pending" },
];

const animals = [
  { name: "Sahiwal Cow", status: "Available", price: "PKR 285,000" },
  { name: "Beetal Goat", status: "Reserved", price: "PKR 48,000" },
  { name: "Kajli Sheep", status: "Sold", price: "PKR 72,000" },
  { name: "Kacchi Buffalo", status: "Available", price: "PKR 420,000" },
];

const users = [
  { name: "Ayesha Khan", role: "Buyer", active: true },
  { name: "Usman Tariq", role: "Seller", active: true },
  { name: "Sana Qureshi", role: "Buyer", active: false },
  { name: "Areeb Malik", role: "Admin", active: true },
];

const categories = [
  { name: "Cattle", share: 38 },
  { name: "Goats", share: 26 },
  { name: "Sheep", share: 22 },
  { name: "Poultry", share: 14 },
];

const reviews = [
  { customer: "Mariam", rating: 5, comment: "Smooth purchase and excellent breeding quality." },
  { customer: "Hassan", rating: 4, comment: "Delivery was fast and animals were healthy." },
  { customer: "Nida", rating: 5, comment: "Great support from the seller and easy checkout." },
];

const notifications = [
  { text: "New premium cattle listing was approved.", time: "8 min ago" },
  { text: "Coupon campaign is scheduled to end in 2 days.", time: "19 min ago" },
  { text: "Two high-value orders need dispatch review.", time: "1 hour ago" },
];

const coupons = [
  { code: "FARM10", value: "10% off", status: "Active" },
  { code: "SEASON25", value: "PKR 25,000", status: "Active" },
  { code: "BRED12", value: "12% off", status: "Paused" },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">FH</div>
          <div>
            <p className="admin-brand-kicker">Marketplace</p>
            <h3>FarmHub Admin</h3>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNav.map(({ label, icon: Icon, active }) => (
            <button key={label} type="button" className={active ? "admin-nav-item active" : "admin-nav-item"}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-card">
          <p>System health</p>
          <strong>99.8%</strong>
          <span>Operational</span>
        </div>
      </aside>

      <main className="admin-main-panel">
        <header className="admin-topbar">
          <div className="admin-search-box">
            <Search size={16} />
            <input type="text" placeholder="Search dashboard" aria-label="Search dashboard" />
          </div>

          <div className="admin-topbar-actions">
            <button type="button" className="admin-icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <Link to="/admin/animals" className="admin-primary-btn">
              <Plus size={16} />
              Add Animal
            </Link>
            <div className="admin-user-pill">
              <div className="admin-avatar">AM</div>
              <div>
                <strong>Admin</strong>
                <span>Manager</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-intro-row">
          <div>
            <p className="admin-kicker">Overview</p>
            <h1>Admin Dashboard</h1>
          </div>
          <div className="admin-badge">Live marketplace</div>
        </div>

        <section className="admin-summary-grid" aria-label="Key statistics">
          {stats.map(({ label, value, delta, trend, icon: Icon }) => (
            <div key={label} className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon">
                  <Icon size={18} />
                </div>
                <span className={trend === "up" ? "admin-trend up" : "admin-trend down"}>
                  {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {delta}
                </span>
              </div>
              <p>{label}</p>
              <h3>{value}</h3>
            </div>
          ))}
        </section>

        <section className="admin-content-grid">
          <div className="admin-panel admin-panel-large">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Analytics</p>
                <h2>Revenue Overview</h2>
              </div>
              <button type="button" className="admin-text-btn">This year</button>
            </div>

            <div className="admin-chart-box" aria-label="Revenue chart">
              {revenueBars.map((value, index) => (
                <div key={index} className="admin-bar-group">
                  <div className="admin-bar" style={{ height: `${value}%` }} />
                  <span>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Performance</p>
                <h2>Sales Mix</h2>
              </div>
            </div>

            <div className="admin-donut-wrap">
              <div className="admin-donut-chart" />
              <div className="admin-donut-center">
                <strong>64%</strong>
                <span>Live sales</span>
              </div>
            </div>

            <div className="admin-legend">
              {categories.map((category) => (
                <div key={category.name} className="admin-legend-item">
                  <span className="admin-legend-swatch" style={{ background: category.name === "Cattle" ? "#2e7d32" : category.name === "Goats" ? "#f4aa32" : category.name === "Sheep" ? "#7cc98d" : "#d7e9d9" }} />
                  <span>{category.name}</span>
                  <strong>{category.share}%</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-bottom-grid">
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Orders</p>
                <h2>Recent Orders</h2>
              </div>
              <button type="button" className="admin-text-btn">View all</button>
            </div>

            <div className="admin-table">
              <div className="admin-table-head">
                <span>Order</span>
                <span>Customer</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
              </div>

              {orders.map((order) => (
                <div key={order.id} className="admin-table-row">
                  <span>{order.id}</span>
                  <span>{order.customer}</span>
                  <span>{order.items}</span>
                  <span>{order.total}</span>
                  <span>
                    <span className={`admin-order-status ${order.status.toLowerCase().replace(/\s+/g, "-")}`}>
                      {order.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-stack">
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <p className="admin-kicker">Animals</p>
                  <h2>Inventory</h2>
                </div>
              </div>

              <div className="admin-list">
                {animals.map((animal) => (
                  <div key={animal.name} className="admin-list-item">
                    <div className="admin-list-badge">🐄</div>
                    <div className="admin-list-copy">
                      <strong>{animal.name}</strong>
                      <span>{animal.price}</span>
                    </div>
                    <span className={`admin-pill ${animal.status.toLowerCase()}`}>{animal.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <p className="admin-kicker">Users</p>
                  <h2>Active Users</h2>
                </div>
              </div>

              <div className="admin-mini-list">
                {users.map((user) => (
                  <div key={user.name} className="admin-user-row">
                    <div className="admin-mini-avatar">{user.name.charAt(0)}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.role}</span>
                    </div>
                    <span className={user.active ? "admin-online" : "admin-offline"}>{user.active ? "Online" : "Offline"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="admin-footer-grid">
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Promotions</p>
                <h2>Coupons</h2>
              </div>
            </div>

            <div className="admin-coupon-list">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="admin-coupon-item">
                  <div>
                    <strong>{coupon.code}</strong>
                    <span>{coupon.value}</span>
                  </div>
                  <span className={coupon.status === "Active" ? "admin-pill active" : "admin-pill paused"}>{coupon.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Reviews</p>
                <h2>Customer Feedback</h2>
              </div>
            </div>

            <div className="admin-review-list">
              {reviews.map((review) => (
                <div key={review.customer} className="admin-review-item">
                  <div className="admin-review-top">
                    <strong>{review.customer}</strong>
                    <span>{"★".repeat(review.rating)}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Alerts</p>
                <h2>Notifications</h2>
              </div>
            </div>

            <div className="admin-notification-list">
              {notifications.map((item) => (
                <div key={item.text} className="admin-notification-item">
                  <div className="admin-notification-dot" />
                  <div>
                    <p>{item.text}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-panel admin-panel-wide">
          <div className="admin-panel-header">
            <div>
              <p className="admin-kicker">Settings</p>
              <h2>Business Controls</h2>
            </div>
            <button type="button" className="admin-text-btn">Manage</button>
          </div>

          <div className="admin-settings-grid">
            <div className="admin-setting-card">
              <div className="admin-setting-icon"><ChartNoAxesCombined size={18} /></div>
              <div>
                <strong>Performance Targets</strong>
                <p>Revenue target is tracking 84% of the monthly goal.</p>
              </div>
            </div>
            <div className="admin-setting-card">
              <div className="admin-setting-icon"><TicketPercent size={18} /></div>
              <div>
                <strong>Coupon Rules</strong>
                <p>Seasonal discounts are active for premium cattle listings.</p>
              </div>
            </div>
            <div className="admin-setting-card">
              <div className="admin-setting-icon"><Settings size={18} /></div>
              <div>
                <strong>Marketplace Policies</strong>
                <p>Updated breeder verification and shipment rules are active.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
