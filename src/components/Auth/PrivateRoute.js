import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
