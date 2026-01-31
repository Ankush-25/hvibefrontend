import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext';
import { ProtectedRouteProps } from '../types/components';

/**
 * ProtectedRoute component to secure routes that require authentication
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = null }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Verifying your session...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(currentUser.userType)) {
    // Redirect to specified path, or to employer/app based on user type
    const redirectPath = redirectTo || (currentUser.userType === 'employer' ? '/employer' : '/app');
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // Render the protected content if authorized
  return <>{children}</>;
};

export default ProtectedRoute;
