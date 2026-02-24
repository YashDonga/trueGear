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
