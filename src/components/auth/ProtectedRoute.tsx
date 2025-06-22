
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredRole?: "company" | "driver" | "transport_agency" | "agent_driver";
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isLoggedIn, userRole } = useAuth();
  const location = useLocation();
  
  console.log("ProtectedRoute - isLoggedIn:", isLoggedIn, "userRole:", userRole, "requiredRole:", requiredRole, "path:", location.pathname);
  
  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // If role is specified and doesn't match, redirect to the appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "company") {
      return <Navigate to="/" replace />;
    } else if (userRole === "driver") {
      return <Navigate to="/driver" replace />;
    } else if (userRole === "transport_agency") {
      return <Navigate to="/transport" replace />;
    } else if (userRole === "agent_driver") {
      return <Navigate to="/agent" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
