import api from "./axios";

// ─── Dashboard ──────────────────────────────────────────────────────────────

export type SAFilterStatus = "ALL" | "QC_COMPLETE" | "AWAITING_APPROVAL" | "IN_SERVICE" | "READY_FOR_BILLING";

export interface SADashboardParams {
  page?: number;
  limit?: number;
  filter?: SAFilterStatus;
  sortOrder?: "asc" | "desc";
}

export interface SAStats {
  qcComplete: number;
  pendingApproval: number;
  totalActive: number;
  inService: number;
  readyForBilling: number;
}

export interface SAVehicle {
  vehicleId: string;
  registrationNumber: string;
  brand: string;
  model: string;
  customerName: string | null;
  serviceType: string | null;
  waitingTime: string;
  status: string;
  hasJobCard: boolean;
}

export interface SAPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SADashboardResponse {
  status: boolean;
  message: string;
  data: {
    stats: SAStats;
    activeVehicles: SAVehicle[];
    pagination: SAPagination;
  };
}

export const getServiceAdvisorDashboard = async (
  params: SADashboardParams = {}
): Promise<SADashboardResponse> => {
  const { data } = await api.get("/service-advisor/dashboard", { params });
  return data;
};

// ─── Vehicle Detail ─────────────────────────────────────────────────────────

export interface SAServiceProgress {
  entry: { status: string };
  qc: { status: string };
  approval: { status: string };
  service: { status: string };
  billing: { status: string };
}

export interface SAVehicleDetail {
  vehicle: {
    id: string;
    registrationNumber: string;
    brand: string;
    model: string;
    modelVariant: string | null;
    vin: string;
    status: string;
  };
  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
  serviceProgress: SAServiceProgress;
  latestInspection: {
    id: string;
    overallStatus: string;
    completedAt: string;
  } | null;
  latestJobCard: {
    id: string;
    status: string;
    totalEstimate: string;
    createdAt: string;
  } | null;
}

export interface SAVehicleDetailResponse {
  status: boolean;
  message: string;
  data: SAVehicleDetail;
}

export const getVehicleDetail = async (
  vehicleId: string
): Promise<SAVehicleDetailResponse> => {
  const { data } = await api.get(`/service-advisor/vehicles/${vehicleId}`);
  return data;
};

// ─── QC Report ──────────────────────────────────────────────────────────────

export interface SAQCItem {
  id: string;
  itemCode: string;
  itemLabel: string;
  result: string;
  comment: string | null;
}

export interface SAQCReport {
  inspectionId: string;
  overallStatus: string;
  completedAt: string;
  brakeTestSummary: {
    performance: string | null;
    noise: string | null;
    vibration: string | null;
  };
  finalRemarks: string | null;
  categories: {
    EXTERIOR: SAQCItem[];
    INTERIOR: SAQCItem[];
    BRAKE: SAQCItem[];
  };
  summary: {
    totalItems: number;
    passCount: number;
    failCount: number;
    warningCount: number;
  };
  failedItems: SAQCItem[];
}

export interface SAQCReportResponse {
  status: boolean;
  message: string;
  data: SAQCReport;
}

export const getVehicleQCReport = async (
  vehicleId: string
): Promise<SAQCReportResponse> => {
  const { data } = await api.get(`/service-advisor/vehicles/${vehicleId}/qc-report`);
  return data;
};

// ─── Vehicle History ────────────────────────────────────────────────────────

export interface SAHistoryItem {
  id: string;
  vehicleId: string;
  serviceType: string;
  serviceDate: string;
  technicianName: string | null;
  totalCost: string | null;
  duration: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SAVehicleHistoryResponse {
  status: boolean;
  message: string;
  data: {
    history: SAHistoryItem[];
  };
}

export const getVehicleHistory = async (
  vehicleId: string
): Promise<SAVehicleHistoryResponse> => {
  const { data } = await api.get(`/service-advisor/vehicles/${vehicleId}/history`);
  return data;
};

// ─── Job Cards ──────────────────────────────────────────────────────────────

export interface SAJobCard {
  id: string;
  vehicleId: string;
  inspectionId: string | null;
  status: string;
  subtotal: string;
  gstPercentage: string;
  gstAmount: string;
  totalEstimate: string;
  sharedAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SAJobCardsResponse {
  status: boolean;
  message: string;
  data: {
    jobCards: SAJobCard[];
  };
}

export const getVehicleJobCards = async (
  vehicleId: string
): Promise<SAJobCardsResponse> => {
  const { data } = await api.get(`/service-advisor/vehicles/${vehicleId}/job-cards`);
  return data;
};
