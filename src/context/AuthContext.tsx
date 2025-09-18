import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import type { User, LoginFormData, RegisterFormData, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await api.get(`/auth/me`); 
          const userData = response.data;
          // Ensure user has a role property
          if (userData && !userData.role) {
            userData.role = 'Visitante'; // Default role if none provided
          }
          setUser(userData); 
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to load user or verify token:", error);
          logout(); 
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(async (credentials: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      let { user: userData, token } = response.data;

      // Decodificar o token para extrair o papel (role)
      const decodedToken: { role: string } = jwtDecode(token);
      userData = { ...userData, role: decodedToken.role };

      console.log('=== LOGIN DEBUG ===');
      console.log('Full API response:', response.data);
      console.log('User data:', userData);
      console.log('User role from API:', userData.role);
      console.log('User role type:', typeof userData.role);

      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
      
      const userRole = userData.role?.toString()?.toUpperCase();
      console.log('Processed role (uppercase):', userRole);
      
      const professionalRoles = ['JOURNALIST', 'JORNALISTA', 'EDITOR'];
      if (professionalRoles.includes(userRole)) {
        console.log('🚀 LOGIN SUCCESS: Redirecting to /journalist for role:', userRole);
        navigate('/journalist', { replace: true });
      } else {
        console.log('🏠 LOGIN SUCCESS: Redirecting to home page for visitor role:', userRole);
        navigate('/journalist', { replace: true });
      }
    } catch (error) {
      console.error('Erro de login:', error);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (userData: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      console.log("Registro bem-sucedido", response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Erro de registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId'); 
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
