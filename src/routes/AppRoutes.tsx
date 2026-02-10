import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Dashboard from '../screens/dashboard/Dashboard';
import Profile from '../screens/profile/Profile';
import MainLayout from '../layouts/MainLayout.tsx';
import { ROUTES } from '../constants/routes';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}> 
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD.slice(1)} element={<Dashboard />} />
        <Route path={ROUTES.PROFILE.slice(1)} element={<Profile />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
