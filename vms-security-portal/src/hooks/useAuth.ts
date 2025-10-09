// src/hooks/useAuth.ts

import { useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken } from '@/api/apiClient'; // This import should now work
import { login, getCurrentUser } from '@/features/auth/authService';
import type { SecurityUser, LoginPayload } from '@/features/auth/types'; // Use 'type' for strictness

// Placeholder for simplicity; replace with a proper state management solution (e.g., Zustand)
export const useAuth = () => { // <--- THIS EXPORT IS CRITICAL
  const [user, setUser] = useState<SecurityUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to initialize user state from token
  const loadUser = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        const currentUser = await getCurrentUser(); 
        setUser(currentUser);
      } catch (e) {
        removeToken();
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogin = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const { token, user } = await login(payload);
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      removeToken();
      setUser(null);
      // Re-throw error for UI to handle messages
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  return { user, isLoading, login: handleLogin, logout: handleLogout, isAuthenticated: !!user };
};