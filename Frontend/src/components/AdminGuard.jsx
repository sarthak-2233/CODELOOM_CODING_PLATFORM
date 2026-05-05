// src/components/AdminGuard.jsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const AdminGuard = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default AdminGuard;