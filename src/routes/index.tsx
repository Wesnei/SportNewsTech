import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import JournalistPage from '../pages/journalist';
import MyArticlesPage from '../pages/journalist/articles';
import PrivateRoute from './PrivateRoute';
import ArticleDetailPage from '../pages/articleDetail';
import RecoveryCard from '../pages/recovery-password';
import ResetCard from '../pages/reset-password';
import NotFound from '../pages/notFoundPage';

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Rotas Públicas - Visitantes podem acessar sem autenticação */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recovery-password" element={<RecoveryCard />} />
        <Route path="/reset-password" element={<ResetCard />} />
        <Route path="/articles/detail/:slug" element={<ArticleDetailPage />} />

        {/* Rotas Protegidas para Jornalistas e Editores */}
        <Route element={<PrivateRoute allowedRoles={['JOURNALIST', 'EDITOR']} />}>
          <Route path="/journalist" element={<JournalistPage />} />
          <Route path="/journalist/articles" element={<MyArticlesPage />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
};

export default AppRoutes;
