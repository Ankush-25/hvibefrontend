import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import authService from "../services/authService";
import { User } from "../types/auth";

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string, userType: string) => Promise<User>;
    register: (username: string, email: string, password: string, userType: string) => Promise<any>;
    logout: () => void;
    setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
    const login = async (email: string, password: string, userType: string): Promise<User> => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password, userType);

            // Ensure we have all required user data
            if (!response.userId || !response.userType) {
                throw new Error('Invalid login response from server');
            }

            const userData: User = {
                userId: response.userId,
                userType: response.userType,
                ...(response.user || {})
            };

            // Update current user state
            setCurrentUser(userData);
            return userData;
        } catch (err: any) {
            setError(err.response?.data || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (username: string, email: string, password: string, userType: string): Promise<any> => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(username, email, password, userType);
            if (response.userId) {
                const userData: User = {
                    userId: response.userId,
                    userType: response.userType,
                    ...(response.user || {})
                };
                setCurrentUser(userData);
            } else {
                setCurrentUser(response);
            }
            console.log(currentUser)
            return response;
        } catch (err: any) {
            setError(err.response?.data || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = (): void => {
        authService.logout();
        setCurrentUser(null);
    };

    const value: AuthContextType = {
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
