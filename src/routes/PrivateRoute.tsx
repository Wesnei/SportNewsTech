import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow any authenticated user
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Check if user has required role - handle all possible role formats
  console.log('=== PRIVATE ROUTE DEBUG ===');
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  console.log('user.role:', user?.role);
  console.log('allowedRoles:', allowedRoles);
  
  const userRole = user?.role?.toString()?.toUpperCase() || 'UNKNOWN';
  console.log('Processed user role (uppercase):', userRole);
  
  const hasRequiredRole = userRole !== 'UNKNOWN' && allowedRoles.some(role => 
    role.toUpperCase() === userRole || 
    (role.toUpperCase() === 'JOURNALIST' && userRole === 'JORNALISTA') ||
    (role.toUpperCase() === 'JORNALISTA' && userRole === 'JOURNALIST')
  );
  
  console.log('role check result:', hasRequiredRole);
  
  if (hasRequiredRole) {
    console.log('✅ PrivateRoute: Access granted, rendering outlet');
    return <Outlet />;
  }

  // Redirect based on user role if they don't have access or if role is undefined
  console.log('PrivateRoute: Access denied, redirecting. User role:', userRole);
  let redirectPath = '/journalist';
  
  // Apenas redireciona para o login se o usuário não estiver autenticado e não tiver um papel
  if (userRole === 'UNKNOWN' && !isAuthenticated) {
    redirectPath = '/login';
  }

  console.log('PrivateRoute: Final redirect path:', redirectPath);
  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
