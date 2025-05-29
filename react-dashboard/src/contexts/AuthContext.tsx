import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (requiredRole: 'admin' | 'editor' | 'viewer') => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else {
      const remembered = localStorage.getItem('rememberedUser');
      if (remembered) setUser(JSON.parse(remembered));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (requiredRole: 'admin' | 'editor' | 'viewer') => {
    if (!user) return false;
    const roles = { admin: 3, editor: 2, viewer: 1 };
    return roles[user.role] >= roles[requiredRole];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
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