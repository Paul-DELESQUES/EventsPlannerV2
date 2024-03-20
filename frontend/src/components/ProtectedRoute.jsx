import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/connexion");
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
