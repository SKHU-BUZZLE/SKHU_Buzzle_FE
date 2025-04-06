import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLogin = !!accessToken;

  return isLogin ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
