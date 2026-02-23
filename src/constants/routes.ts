export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SECURITY_DASHBOARD: '/security-dashboard',
  QUALITY_CHECK_DASHBOARD: '/quality-check-dashboard',
  QUALITY_CHECK_INSPECTION: '/quality-check-dashboard/quality-check-inspection',
  SERVICE_ADVISOR_DASHBOARD: '/service-advisor-dashboard',
  SERVICE_ADVISOR_VEHICLE_DETAIL: '/service-advisor-dashboard/vehicle/:id',
  CUSTOMER_APPROVAL_DASHBOARD: '/customer-approval-dashboard',
  CUSTOMER_PROFILE_DASHBOARD: '/customer-profile-dashboard',
  SPARE_PARTS_DASHBOARD: '/spare-parts-dashboard',
  TECHNICIAN_DASHBOARD: '/technician-dashboard',
  TECHNICIAN_JOB_DETAIL: '/technician-dashboard/job/:id',
  PROFILE: '/profile',
  ADD_VEHICLE: '/security-dashboard/add-vehicle',
  VEHICLE_ENTRY_SUCCESS: '/security-dashboard/vehicle-entry-success',
  CREATE_JOB_CARD: '/service-advisor-dashboard/job-card/:vehicleId',
  SEND_ESTIMATE: '/service-advisor-dashboard/send-estimate',
};

export default ROUTES;
