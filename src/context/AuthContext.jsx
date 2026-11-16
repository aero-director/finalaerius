import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUrl } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aerius_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('aerius_token') || '');
  const [loading, setLoading] = useState(true);

  // Sync with backend on initial load if we have token or cookie
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(apiUrl('/api/auth/me'), {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('aerius_user', JSON.stringify(data.user));
          }
        } else if (res.status === 401) {
          // If server rejects cookie/token, reset
          if (!user) {
            setUser(null);
            localStorage.removeItem('aerius_user');
            localStorage.removeItem('aerius_token');
          }
        }
      } catch {
        // Offline or server start
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const loginUser = (userData, userToken) => {
    setUser(userData);
    if (userToken) {
      setToken(userToken);
      localStorage.setItem('aerius_token', userToken);
    }
    if (userData) {
      localStorage.setItem('aerius_user', JSON.stringify(userData));
    }
  };

  const updateUser = (userData) => {
    setUser(prev => {
      const updated = { ...prev, ...userData };
      localStorage.setItem('aerius_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logoutUser = async () => {
    try {
      await fetch(apiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setToken('');
      localStorage.removeItem('aerius_user');
      localStorage.removeItem('aerius_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginUser, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
