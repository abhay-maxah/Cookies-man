import { Navigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/account/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
