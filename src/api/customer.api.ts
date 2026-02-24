import api from "./axios";

export interface CustomerSearchItem {
  id: string;
  crmReferenceNo: string;
  custSequenceId: string;
  customerType: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  primaryEmail: string;
  activeCustomer: boolean;
  contactNumber: string | null;
}

export interface CustomerSearchResponse {
  status: boolean;
  message: string;
  data: CustomerSearchItem[];
}

export const searchCustomers = async (
  q: string
): Promise<CustomerSearchResponse> => {
  const { data } = await api.get("/customers/search", { params: { q } });
  return data;
};
