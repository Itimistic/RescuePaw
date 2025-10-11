import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api";

function ProtectedRoute({ children, adminOnly = false }) {
  const user = getCurrentUser(); // decoded token from localStorage

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/pets" replace />;
  }

  return children;
}

export default ProtectedRoute;
