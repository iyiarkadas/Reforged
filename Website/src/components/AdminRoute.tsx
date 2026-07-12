import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const currentRole = localStorage.getItem("reforged-session-role");
  const isAdmin = currentRole === "admin";

  if (!isAdmin) {
    // Force kick non-admins out to the safe default portal dashboard
    return <Navigate to="/portal/dashboard" replace />;
  }

  return <>{children}</>;
};