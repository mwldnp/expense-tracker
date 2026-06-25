import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();

  confirm("Apakah anda yakin ingin keluar?");
  logout();

  return <Navigate to="login" replace />;
};

export default Logout;
