import { createContext, useContext, useEffect, useState } from "react";
import authService from "./services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = authService.getCurrentUser();
          
          // Validate user data
          if (userData && userData.userId && userData.userType) {
            setCurrentUser(userData);
          } else {
            console.warn('Invalid user data in storage, logging out');
            await authService.logout();
            setCurrentUser(null);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError("Session validation failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password, userType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password, userType);
      
      // Ensure we have all required user data
      if (!response.userId || !response.userType) {
        throw new Error('Invalid login response from server');
      }
      
      const userData = {
        userId: response.userId,
        userType: response.userType,
        ...(response.user || {})
      };
      
      // Update current user state
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username, email, password,userType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(username, email, password,userType);
      setCurrentUser(response.userId ? { userId: response.userId, ...response.user } : response);
      console.log(currentUser)
      return response;
    } catch (err) {
      setError(err.response?.data || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    setCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};