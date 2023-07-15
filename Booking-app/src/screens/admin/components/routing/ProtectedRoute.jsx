import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles }) {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <Navigate to="/admin-login" />;
  }

  if (user?.role !== 'admin' && !roles?.includes(user?.role)) {
    return <Navigate to="/admin" />;
  }

  return children;
}
export default ProtectedRoute;