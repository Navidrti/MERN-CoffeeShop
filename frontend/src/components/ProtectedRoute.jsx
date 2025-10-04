import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { admin } = useContext(AuthContext);

  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
