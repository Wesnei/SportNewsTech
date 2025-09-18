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

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        {/* Rotas Públicas*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/articles/detail/:slug" element={<ArticleDetailPage />} />
        <Route path="/recovery-password" element={<RecoveryCard />} />
        <Route path="/recovery-password" element={<ResetCard />} />

        {/* Rotas Protegidas (Jornalista/Editor) */}
        <Route element={<PrivateRoute allowedRoles={['JOURNALIST', 'EDITOR']} />}>
          <Route path="/journalist" element={<JournalistPage />} />
          <Route path="/journalist/articles" element={<MyArticlesPage />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    
  );
};

export default AppRoutes;
