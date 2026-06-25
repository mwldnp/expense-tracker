import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedAuth() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  return <Outlet />;
}
