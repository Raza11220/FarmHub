import { UserProfile, useUser } from "@clerk/clerk-react";

function Profile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="auth-loading">
        <div className="auth-loader" />
      </div>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <span className="section-label">MY ACCOUNT</span>
          <h1>{user?.fullName || "Farmer Profile"}</h1>
        </div>
      </div>

      <div className="profile-panel">
        <UserProfile routing="path" path="/profile" />
      </div>
    </main>
  );
}

export default Profile;
