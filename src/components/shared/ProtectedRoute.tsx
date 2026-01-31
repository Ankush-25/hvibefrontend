import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ProtectedRouteProps } from '../../types/components';

/**
 * ProtectedRoute component to secure routes that require authentication
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = null }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Verifying your session...</p>
                </div>
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
