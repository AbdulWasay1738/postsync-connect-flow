
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('postsync_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('postsync_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // 🔌 BACKEND_HOOK: authenticateUser(email, password)
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful login for demo purposes
    const mockUser: User = {
      id: '123',
      name: 'Demo User',
      email,
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=1A73E8&color=fff'
    };
    
    setUser(mockUser);
    localStorage.setItem('postsync_user', JSON.stringify(mockUser));
    setIsLoading(false);
    navigate('/dashboard');
  };

  const signup = async (name: string, email: string, password: string) => {
    // 🔌 BACKEND_HOOK: registerUser(name, email, password)
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful registration for demo purposes
    const mockUser: User = {
      id: '123',
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1A73E8&color=fff`
    };
    
    setUser(mockUser);
    localStorage.setItem('postsync_user', JSON.stringify(mockUser));
    setIsLoading(false);
    navigate('/dashboard');
  };

  const logout = () => {
    // 🔌 BACKEND_HOOK: logoutUser()
    setUser(null);
    localStorage.removeItem('postsync_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
