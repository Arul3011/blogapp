import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DataContext from "../DataContext/DataContext";

const ProtectedRoute = () => {
  const { user, setUserID, setuserName } = useContext(DataContext);

  return user || document.cookie ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
