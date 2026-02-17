import { Clock, SlidersHorizontal, FileText } from "lucide-react";
import truck from "../../assets/truck.png";
import Button from '../common/Button';
import { useState } from 'react';
import { Pagination } from "../common/Pagination";
import { useNavigate } from "react-router-dom";

interface ServiceQueueRow {
  id: string;
  registration: string;
  model: string;
  serviceType: string;
  advisor: string;
  waitingTime: string;
  status: "Awaiting Approval" | "QC Complete" | "Ready for Billing" | "In Service";
}

type StatusFilter = "All" | "Awaiting Approval" | "In Service" | "QC Complete" | "Ready for Billing";

const vehicles: ServiceQueueRow[] = [
  { id: "1", registration: "BL 00 MY ZN", model: "Vehicle Model Name", serviceType: "Standard Service", advisor: "John Doe", waitingTime: "45 Mins", status: "In Service" },
  { id: "2", registration: "BL 01 MY ZN", model: "Vehicle Model X", serviceType: "Premium Service", advisor: "Jane Smith", waitingTime: "60 Mins", status: "Awaiting Approval" },
  { id: "3", registration: "BL 02 MY ZN", model: "Vehicle Model Y", serviceType: "Standard Service", advisor: "John Doe", waitingTime: "30 Mins", status: "QC Complete" },
  { id: "4", registration: "BL 03 MY ZN", model: "Vehicle Model Z", serviceType: "Express Service", advisor: "Mike Johnson", waitingTime: "20 Mins", status: "Ready for Billing" },
  { id: "5", registration: "BL 04 MY ZN", model: "Vehicle Model A", serviceType: "Comprehensive Service", advisor: "Jane Smith", waitingTime: "90 Mins", status: "In Service" },
  { id: "6", registration: "BL 05 MY ZN", model: "Vehicle Model B", serviceType: "Basic Service", advisor: "Mike Johnson", waitingTime: "25 Mins", status: "Awaiting Approval" },
  { id: "7", registration: "BL 06 MY ZN", model: "Vehicle Model C", serviceType: "Standard Service", advisor: "John Doe", waitingTime: "35 Mins", status: "QC Complete" },
  { id: "8", registration: "BL 07 MY ZN", model: "Vehicle Model D", serviceType: "Premium Service", advisor: "Jane Smith", waitingTime: "50 Mins", status: "Ready for Billing" },
];

const statusConfig = {
  "In Service": { color: "text-[#0061FF]", bg: "bg-[#0061FF]" },
  "Awaiting Approval": { color: "text-[#DA5A00]", bg: "bg-[#DA5A00]" },
  "QC Complete": { color: "text-[#00BF06]", bg: "bg-[#00BF06]" },
  "Ready for Billing": { color: "text-[#FE306C]", bg: "bg-[#FE306C]" },
};

function StatusBadge({ status }: { status: ServiceQueueRow['status'] }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusConfig[status].bg}`} />
      <span className={statusConfig[status].color}>{status}</span>
    </div>
  );
}

export function ServiceAdvisorTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const itemsPerPage = 5;

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleVehicleClick = (vehicleId: string, status: string) => {
    if (status === "QC Complete") {
      navigate(`vehicle/${vehicleId}`);
    }
  };

  // Filter vehicles based on status filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Awaiting Approval") return vehicle.status === "Awaiting Approval";
    if (statusFilter === "In Service") return vehicle.status === "In Service";
    if (statusFilter === "QC Complete") return vehicle.status === "QC Complete";
    if (statusFilter === "Ready for Billing") return vehicle.status === "Ready for Billing";
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  const isEmpty = filteredVehicles.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-5">
      {/* Header */}
      <div className="mb-4 md:mb-5">
        <h2 className="text-[#333] text-[15px] md:text-[16px] font-semibold">Service Queue</h2>
        <p className="text-[#999] text-[12px]">Vehicles currently in service</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
        <div className="flex flex-wrap gap-2 bg-[#f5f5f5] p-1.25 rounded-[10px]">
          <Button
            onClick={() => handleStatusFilterChange("All")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "All"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
            }`}
          >
            All
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("Awaiting Approval")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Awaiting Approval"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
            }`}
          >
            Awaiting Approval
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("In Service")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "In Service"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
            }`}
          >
            In Service
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("QC Complete")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "QC Complete"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
            }`}
          >
            QC Complete
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("Ready for Billing")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Ready for Billing"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
            }`}
          >
            Ready for Billing
          </Button>
        </div>
        <Button variant="outline" icon={<SlidersHorizontal className="w-4 h-4" />} className="text-[#333]">
          Filter
        </Button>
      </div>

      {/* Empty State or Table */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-black text-base">No Vehicle Found!</p>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-3 pr-5 text-[#333] text-[14px] font-normal">Vehicle Details</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Service Type</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Waiting Time</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Status</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal"></th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#fafafa]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
                          <img
                            src={truck}
                            alt="Vehicle"
                            className="max-w-17.5 object-contain "
                          />
                        </div>
                        <div>
                          <p 
                            className={`text-[16px] mb-0.5 ${vehicle.status === "QC Complete" ? "text-[#0061FF] cursor-pointer hover:underline" : "text-[#333]"}`}
                            onClick={() => handleVehicleClick(vehicle.id, vehicle.status)}
                          >
                            {vehicle.registration}
                          </p>
                          <p className="text-[#999] text-[12px]">{vehicle.model}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-[#333] text-[14px]">{vehicle.serviceType}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-[#999] text-[14px]">
                        <Clock className="w-4 h-4" />
                        <span>{vehicle.waitingTime}</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={vehicle.status} />
                    </td>
                    <td className="px-2">
                      {vehicle.status === "QC Complete" && (
                        <Button
                          variant="custom"
                          customStyles={{
                            background: "#DEEBFF66",
                            border: "#0061FF",
                            text: "#0061FF",
                            hoverBg: "#DEEBFF99",
                          }}
                          icon={<FileText size={16} />}
                          className="h-8 px-2 text-xs"
                          onClick={() => navigate(`job-card/${vehicle.id}`)}
                        >
                          Create Job Card
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button variant="gradient" className="h-8 px-2 text-xs">
                        Call Customer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:block md:hidden space-y-3 mt-4">
            {paginatedVehicles.map((vehicle) => (
              <div key={vehicle.id} className="border rounded-xl p-3">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
                      <img
                        src={truck}
                        alt="Vehicle"
                        className="max-w-15 object-contain"
                      />
                    </div>
                    <div>
                      <p 
                        className={`text-sm font-medium ${vehicle.status === "QC Complete" ? "text-[#0061FF] cursor-pointer hover:underline" : "text-[#333]"}`}
                        onClick={() => handleVehicleClick(vehicle.id, vehicle.status)}
                      >
                        {vehicle.registration}
                      </p>
                      <p className="text-xs text-[#999]">{vehicle.model}</p>
                    </div>
                  </div>

                  <StatusBadge status={vehicle.status} />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <p className="text-[#999] text-xs">Service Type</p>
                    <p className="text-[#333]">{vehicle.serviceType}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Advisor</p>
                    <p className="text-[#333]">{vehicle.advisor}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Waiting Time</p>
                    <div className="flex items-center gap-1.5 text-[#999]">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.waitingTime}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col gap-2">
                  {vehicle.status === "QC Complete" && (
                    <Button
                      variant="custom"
                      customStyles={{
                        background: "#DEEBFF66",
                        border: "#0061FF",
                        text: "#0061FF",
                        hoverBg: "#DEEBFF99",
                      }}
                      icon={<FileText size={16} />}
                      className="w-full h-9 text-sm"
                      onClick={() => navigate(`job-card/${vehicle.id}`)}
                    >
                      Create Job Card
                    </Button>
                  )}
                  <Button variant="gradient" className="w-full">Call Customer</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {!isEmpty && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredVehicles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

