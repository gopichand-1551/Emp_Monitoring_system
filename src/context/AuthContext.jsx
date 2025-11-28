import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = authService.getSession();
        if (session && session.isAuthenticated) {
            setIsAuthenticated(true);
            setUser({ name: session.name, email: session.email });
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const result = authService.login(email, password);
        if (result.success) {
            setIsAuthenticated(true);
            setUser({ name: result.session.name, email: result.session.email });
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const signup = (name, email, password) => {
        const result = authService.signup(name, email, password);
        if (result.success) {
            setIsAuthenticated(true);
            setUser({ name: result.session.name, email: result.session.email });
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
