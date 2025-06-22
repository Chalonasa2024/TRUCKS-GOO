
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'company' | 'driver' | 'transport_agency' | 'agent_driver';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  userEmail: string | null;
  userName: string | null;
  needsProfileSetup: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [needsProfileSetup, setNeedsProfileSetup] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole') as UserRole | null;
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedUserName = localStorage.getItem('userName');
    const storedNeedsProfileSetup = localStorage.getItem('needsProfileSetup') === 'true';
    
    setIsLoggedIn(storedIsLoggedIn);
    setUserRole(storedUserRole);
    setUserEmail(storedUserEmail);
    setUserName(storedUserName);
    setNeedsProfileSetup(storedNeedsProfileSetup);
    
    if (storedIsLoggedIn && storedNeedsProfileSetup) {
      if (storedUserRole === 'company') {
        navigate('/company-onboarding');
      } else if (storedUserRole === 'driver') {
        navigate('/driver-onboarding');
      } else if (storedUserRole === 'transport_agency') {
        navigate('/transport-agency-onboarding');
      } else if (storedUserRole === 'agent_driver') {
        navigate('/agent-driver-onboarding');
      }
    }
  }, [navigate]);
  
  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, you would call an API here
    // For demo purposes, we'll simulate a successful login
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
    
    // Redirect based on role
    if (role === 'company') {
      navigate('/');
    } else if (role === 'driver') {
      navigate('/driver');
    } else if (role === 'transport_agency') {
      navigate('/transport');
    } else if (role === 'agent_driver') {
      navigate('/agent');
    }
  };
  
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('needsProfileSetup');
    
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);
    setUserName(null);
    setNeedsProfileSetup(false);
    
    navigate('/login');
  };
  
  const checkAuth = () => {
    return isLoggedIn;
  };
  
  const value = {
    isLoggedIn,
    userRole,
    userEmail,
    userName,
    needsProfileSetup,
    login,
    logout,
    checkAuth,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
