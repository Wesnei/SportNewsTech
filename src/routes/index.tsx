import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import RecoveryCard from "../pages/recovery-password";
import NotFound from "../pages/notFoundPage";
import HomePage from "../pages/home/index";
import JournalistPage from "../pages/journalist";
import MyArticlesPage from "../pages/journalist/articles";
import ResetCard from "../pages/reset-password";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery-password" element={<RecoveryCard />} />
      <Route path="/reset-password" element={<ResetCard />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/journalist" element={<JournalistPage />} />
      <Route path="/journalist/articles" element={<MyArticlesPage />} />

      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
