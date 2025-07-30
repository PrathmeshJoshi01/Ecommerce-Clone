import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
