import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import SecurityDashboard from '../screens/dashboard/SecurityDashboard.tsx';
import QualityCheckDashboard from '../screens/dashboard/QualityCheckDashboard.tsx';
import QualityCheckInspection from '../screens/dashboard/QualityCheckInspection.tsx';
import ServiceAdvisorDashboard from '../screens/dashboard/ServiceAdvisorDashboard.tsx';
import ServiceAdvisorVehicleDetail from '../screens/dashboard/ServiceAdvisorVehicleDetail.tsx';
import Profile from '../screens/profile/Profile';
import AddVehicle from '../screens/vehicles/AddVehicle';
import VehicleEntrySuccess from '../screens/vehicles/VehicleEntrySuccess';
import CreateJobCard from '../screens/vehicles/CreateJobCard';
import MainLayout from '../layouts/MainLayout.tsx';
import { ROUTES } from '../constants/routes';

const AppRoutes: React.FC = () => (
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Navigate to={ROUTES.SECURITY_DASHBOARD} replace />} />
        <Route path={ROUTES.SECURITY_DASHBOARD.slice(1)} element={<SecurityDashboard />} />
        <Route path={ROUTES.QUALITY_CHECK_DASHBOARD.slice(1)} element={<QualityCheckDashboard />} />
        <Route path={ROUTES.QUALITY_CHECK_INSPECTION.slice(1)} element={<QualityCheckInspection />} />
        <Route path={ROUTES.SERVICE_ADVISOR_DASHBOARD.slice(1)} element={<ServiceAdvisorDashboard />} />
        <Route path={ROUTES.SERVICE_ADVISOR_VEHICLE_DETAIL.slice(1)} element={<ServiceAdvisorVehicleDetail />} />
        <Route path={ROUTES.PROFILE.slice(1)} element={<Profile />} />
        <Route path={ROUTES.ADD_VEHICLE.slice(1)} element={<AddVehicle />} />
        <Route path={ROUTES.VEHICLE_ENTRY_SUCCESS.slice(1)} element={<VehicleEntrySuccess />} />
        <Route path={ROUTES.CREATE_JOB_CARD.slice(1)} element={<CreateJobCard />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
