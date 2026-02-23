import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import SecurityDashboard from '../screens/dashboard/SecurityDashboard.tsx';
import QualityCheckDashboard from '../screens/dashboard/QualityCheckDashboard.tsx';
import QualityCheckInspection from '../screens/dashboard/QualityCheckInspection.tsx';
import ServiceAdvisorDashboard from '../screens/dashboard/ServiceAdvisorDashboard.tsx';
import ServiceAdvisorVehicleDetail from '../screens/dashboard/ServiceAdvisorVehicleDetail.tsx';
import CustomerApprovalDashboard from '../screens/dashboard/CustomerApprovalDashboard.tsx';
import CustomerProfileDashboard from '../screens/dashboard/CustomerProfileDashboard.tsx';
import SparePartsDashboard from '../screens/dashboard/SparePartsDashboard.tsx';
import TechnicianDashboard from '../screens/dashboard/TechnicianDashboard.tsx';
import TechnicianJobDetail from '../screens/dashboard/TechnicianJobDetail.tsx';
import Profile from '../screens/profile/Profile';
import AddVehicle from '../screens/vehicles/AddVehicle';
import VehicleEntrySuccess from '../screens/vehicles/VehicleEntrySuccess';
import CreateJobCard from '../screens/vehicles/CreateJobCard';
import MainLayout from '../layouts/MainLayout.tsx';
import { ROUTES } from '../constants/routes';
import { SendEstimate } from '../screens/vehicles/SendEstimate.tsx';

const AppRoutes: React.FC = () => (
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Navigate to={ROUTES.SECURITY_DASHBOARD} replace />} />
        <Route path={ROUTES.SECURITY_DASHBOARD.slice(1)} element={<SecurityDashboard />}>
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="vehicle-entry-success" element={<VehicleEntrySuccess />} />
        </Route>
        <Route path={ROUTES.QUALITY_CHECK_DASHBOARD.slice(1)} element={<QualityCheckDashboard />}>
          <Route path="quality-check-inspection" element={<QualityCheckInspection />} />
        </Route>
        <Route path={ROUTES.SERVICE_ADVISOR_DASHBOARD.slice(1)} element={<ServiceAdvisorDashboard />}>
          <Route path="vehicle/:id" element={<ServiceAdvisorVehicleDetail />} />
          <Route path="job-card/:vehicleId" element={<CreateJobCard />} />
          <Route path="send-estimate/:vehicleId?" element={<SendEstimate />} />
        </Route>
        <Route path={ROUTES.CUSTOMER_APPROVAL_DASHBOARD.slice(1)} element={<CustomerApprovalDashboard />} />
        <Route path={ROUTES.CUSTOMER_PROFILE_DASHBOARD.slice(1)} element={<CustomerProfileDashboard />} />
        <Route path={ROUTES.SPARE_PARTS_DASHBOARD.slice(1)} element={<SparePartsDashboard />} />
        <Route path={ROUTES.TECHNICIAN_DASHBOARD.slice(1)} element={<TechnicianDashboard />} />
        <Route path="technician-dashboard/job/:id" element={<TechnicianJobDetail />} />
        <Route path={ROUTES.PROFILE.slice(1)} element={<Profile />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
