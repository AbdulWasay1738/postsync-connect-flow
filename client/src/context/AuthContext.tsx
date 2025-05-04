import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

/* --------------------------------------------------------------------
   Types
-------------------------------------------------------------------- */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  invitationAccepted: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

/* --------------------------------------------------------------------
   Context hooks
-------------------------------------------------------------------- */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

/* --------------------------------------------------------------------
   Provider
-------------------------------------------------------------------- */
interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  /* --------------------------------------------------------------
     Restore session on refresh
  -------------------------------------------------------------- */
  useEffect(() => {
    const rawUser = localStorage.getItem('postsync_user');
    const token   = localStorage.getItem('postsync_token');

    if (rawUser && token) {
      try {
        setUser(JSON.parse(rawUser));
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  /* --------------------------------------------------------------
     Helpers
  -------------------------------------------------------------- */
  const handleSuccess = (token: string, user: User) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('postsync_token', token);
    localStorage.setItem('postsync_user', JSON.stringify(user));
    setUser(user);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { status, data } = await api.post('/auth/register', { name, email, password });

      // 201 with message means pending approval
      if (status === 201 && !data.token) {
        alert(data.message || 'Signup successful – pending admin approval');
        navigate('/login');
        return;
      }

      handleSuccess(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      handleSuccess(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('Your invitation is still pending admin approval.');
      } else {
        alert(err.response?.data?.msg || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('postsync_token');
    localStorage.removeItem('postsync_user');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
    navigate('/');
  };

  /* -------------------------------------------------------------- */
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
