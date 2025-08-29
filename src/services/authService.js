import axios from 'axios';
import { Api_url } from '../globalConfig';

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const USER_DATA_KEY = 'userData';

// Configure axios to send the token with every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration and unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired or invalid
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Login user and store JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Response with user data
 */
export const login = async (email, password, userType) => {
  try {
    const response = await axios.post(`${Api_url}/login`, { email, password, userType });
    console.log(response.data);
    
    if (response.data && response.data.token) {
      // Validate required fields
      if (!response.data.userId || !response.data.userType) {
        throw new Error('Invalid login response: missing required fields');
      }
      
      // Store token and user ID
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_ID_KEY, response.data.userId);
      
      // Prepare user data object
      const userData = {
        ...(response.data.user || {}),
        userId: response.data.userId,
        userType: response.data.userType
      };
      
      // Store user data
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      localStorage.setItem("userType", response.data.userType);
      
      // Set session expiration (based on token expiry, default 8 hours)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8);
      localStorage.setItem('expiresAt', expiresAt.toISOString());
      
      // Start token refresh timer
      startTokenRefreshTimer();
      
      // Return complete user data
      return userData;
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Register a new user
 * @param {string} username - Username
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Response with user data
 */
export const register = async (username, email, password, userType) => {
  try {
    const response = await axios.post(`${Api_url}/signup`, { 
      username, 
      email, 
      password,
      userType 
    });
    
    if (response.data && response.data.token) {
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_ID_KEY, response.data.userId);
      localStorage.setItem("userType", response.data.userType);
      // Store additional user data if available
      if (response.data.user) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }
      
      // Set session expiration
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8);
      localStorage.setItem('expiresAt', expiresAt.toISOString());
      
      startTokenRefreshTimer();
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logout user and clear session data
 * @returns {Promise<void>}
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  localStorage.removeItem('expiresAt');
  
  // Clear any refresh timers
  if (window.tokenRefreshTimer) {
    clearTimeout(window.tokenRefreshTimer);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem('expiresAt');
  
  if (!token || !expiresAt) {
    return false;
  }
  
  // Check if token is expired
  const now = new Date();
  const expiration = new Date(expiresAt);
  
  if (now > expiration) {
    // Token expired, clear session
    logout();
    return false;
  }
  
  return true;
};

/**
 * Get current user data
 * @returns {Object|null} - User data or null if not authenticated
 */
export const getCurrentUser = () => {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    const userId = localStorage.getItem(USER_ID_KEY);
    const authtoken = localStorage.getItem(TOKEN_KEY);
    const userDataString = localStorage.getItem(USER_DATA_KEY);
    const userType = localStorage.getItem("userType");
    
    // Parse the existing user data if it exists
    const userData = userDataString ? JSON.parse(userDataString) : {};
    
    // Ensure all required fields are present
    const user = {
      userId,
      authtoken,
      userType: userType || userData.userType,
      ...userData
    };
    
    // Validate required fields
    if (!user.userId || !user.userType) {
      console.error('Invalid user data in storage:', user);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Refresh JWT token before it expires
 */
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${Api_url}/refresh-token`, {
      userId: localStorage.getItem(USER_ID_KEY),
      token: localStorage.getItem(TOKEN_KEY)
    });
    
    if (response.data && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      
      // Update expiration time
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8);
      localStorage.setItem('expiresAt', expiresAt.toISOString());
      
      startTokenRefreshTimer();
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    // If refresh fails, logout the user
    logout();
    window.location.href = '/login';
  }
};

/**
 * Start timer to refresh token before it expires
 */
const startTokenRefreshTimer = () => {
  if (window.tokenRefreshTimer) {
    clearTimeout(window.tokenRefreshTimer);
  }
  
  // Refresh token 30 minutes before expiration
  const expiresAt = new Date(localStorage.getItem('expiresAt'));
  const refreshTime = expiresAt.getTime() - new Date().getTime() - (30 * 60 * 1000);
  
  if (refreshTime > 0) {
    window.tokenRefreshTimer = setTimeout(refreshToken, refreshTime);
  } else {
    // Token is already close to expiration, refresh now
    refreshToken();
  }
};

// Initialize authentication state when the service is imported
if (isAuthenticated()) {
  startTokenRefreshTimer();
}

const authService = {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
  refreshToken
};

export default authService; 