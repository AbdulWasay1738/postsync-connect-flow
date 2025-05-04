import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /* --------------------------------------------------------
     Restore user session on page refresh
  -------------------------------------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem('postsync_user');
    const token = localStorage.getItem('postsync_token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('postsync_user');
        localStorage.removeItem('postsync_token');
      }
    }
    setIsLoading(false);
  }, []);

  /* --------------------------------------------------------
     Auth helpers
  -------------------------------------------------------- */
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });

      localStorage.setItem('postsync_token', data.token);
      localStorage.setItem('postsync_user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.msg || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });

      localStorage.setItem('postsync_token', data.token);
      localStorage.setItem('postsync_user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('postsync_user');
    localStorage.removeItem('postsync_token');
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
