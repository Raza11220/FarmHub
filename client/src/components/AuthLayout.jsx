import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function AuthLayout({ mode = "sign-in" }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="auth-loading">
        <div className="auth-loader" />
      </div>
    );
  }

  if (isSignedIn) {
    const redirectTo = location.state?.from || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="auth-page-shell">
      <div className="auth-card">
        {mode === "sign-up" ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
}

export default AuthLayout;
