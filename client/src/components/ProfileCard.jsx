import { Camera, PencilLine } from "lucide-react";

function ProfileCard({ name, email, phone, location }) {
  const initials = (name || "FarmHub User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-card">
      <div className="profile-cover" />

      <div className="profile-card-body">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">{initials}</div>
          <button className="profile-photo-btn" type="button" aria-label="Change profile photo">
            <Camera size={14} />
          </button>
        </div>

        <div className="profile-meta">
          <div>
            <p className="muted-label">Account Holder</p>
            <h3>{name || "FarmHub User"}</h3>
          </div>

          <button className="edit-profile-btn" type="button">
            <PencilLine size={16} />
            Edit Profile
          </button>
        </div>

        <div className="profile-details-grid">
          <div>
            <span>Email</span>
            <strong>{email || "you@farmhub.com"}</strong>
          </div>
          <div>
            <span>Phone</span>
            <strong>{phone || "+92 300 0000000"}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{location || "Lahore, Pakistan"}</strong>
          </div>
          <div>
            <span>Member</span>
            <strong>Premium Buyer</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
