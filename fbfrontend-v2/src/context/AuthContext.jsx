import { createContext, useState, useEffect, useContext } from 'react';
import { loginRequest, signupRequest } from '../api/auth';

export const LOGO_URL = '/freshbasket.png';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Sign in. Returns { success, user } or { success: false, error }.
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      const { user: userData, token } = await loginRequest(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', token);
      return { success: true, user: userData };
    } catch (err) {
      return { success: false, error: err.displayMessage || 'Login failed.' };
    }
  };

  /**
   * Register. Returns { success, user } or { success: false, error }.
   * @param {Object} userData
   */
  const signup = async (userData) => {
    try {
      const { user: newUser, token } = await signupRequest(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', token);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.displayMessage || 'Registration failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  /**
   * Update the current user's profile data. Syncs state with localStorage.
   * Used after profile updates to refresh the display.
   * @param {Object} updatedUserData - Updated user fields to merge with current user
   */
  const updateUser = (updatedUserData) => {
    if (!user) return;
    const mergedUser = { ...user, ...updatedUserData };
    setUser(mergedUser);
    localStorage.setItem('user', JSON.stringify(mergedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

