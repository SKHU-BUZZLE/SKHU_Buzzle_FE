import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLogin = !!accessToken;

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
