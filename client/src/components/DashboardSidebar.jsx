import { UserRound, ClipboardList, Heart, MapPin, Bell, Settings, LogOut } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

function DashboardSidebar({ activeTab = "profile", onSelect }) {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <img src="/assets/images/logo.png" alt="FarmHub logo" className="sidebar-logo-img" />
        <div>
          <p className="sidebar-kicker">Account</p>
          <h3>Farmer Panel</h3>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={activeTab === id ? "sidebar-item active" : "sidebar-item"}
            type="button"
            onClick={() => onSelect?.(id)}
            aria-pressed={activeTab === id}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default DashboardSidebar;
