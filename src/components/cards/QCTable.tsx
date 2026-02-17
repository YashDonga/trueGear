import { Clock, SlidersHorizontal } from "lucide-react";
import truck from "../../assets/truck.png";
import Button from '../common/Button';
import { useState } from 'react';
import { Pagination } from "../common/Pagination";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

interface VehicleQueueRow {
  registration: string;
  model: string;
  serviceType: string;
  waitingTime: string;
  status: 'In Progress' | 'Scheduled' | 'Completed' | 'Pending';
  priority: 'Standard' | 'Urgent' | 'Express' | 'Basic';
}
type StatusFilter = "All" | "Urgent" | "Delayed";

const vehicles: VehicleQueueRow[] = [
  { registration: 'BL 00 MY ZN', model: 'Vehicle Model Name', serviceType: 'Standard Service', waitingTime: '45 Mins', status: 'In Progress', priority: 'Standard' },
  { registration: 'BL 01 MY ZN', model: 'Vehicle Model X', serviceType: 'Premium Service', waitingTime: '60 Mins', status: 'Scheduled', priority: 'Urgent' },
  { registration: 'BL 02 MY ZN', model: 'Vehicle Model Y', serviceType: 'Standard Service', waitingTime: '30 Mins', status: 'Completed', priority: 'Standard' },
  { registration: 'BL 03 MY ZN', model: 'Vehicle Model Z', serviceType: 'Express Service', waitingTime: '20 Mins', status: 'Pending', priority: 'Express' },
  { registration: 'BL 04 MY ZN', model: 'Vehicle Model A', serviceType: 'Comprehensive Service', waitingTime: '90 Mins', status: 'In Progress', priority: 'Urgent' },
  { registration: 'BL 05 MY ZN', model: 'Vehicle Model B', serviceType: 'Basic Service', waitingTime: '25 Mins', status: 'Scheduled', priority: 'Basic' },
  { registration: 'BL 06 MY ZN', model: 'Vehicle Model C', serviceType: 'Standard Service', waitingTime: '35 Mins', status: 'In Progress', priority: 'Standard' },
  { registration: 'BL 07 MY ZN', model: 'Vehicle Model D', serviceType: 'Premium Service', waitingTime: '50 Mins', status: 'Completed', priority: 'Express' },
];

function StatusBadge({ status }: { status: VehicleQueueRow['status'] }) {
  const styles = {
    'In Progress': 'bg-[#e8f4ff] text-[#0066cc] border-[#b3d9ff]',
    'Scheduled': 'bg-[#fff4e6] text-[#ff9500] border-[#ffd699]',
    'Completed': 'bg-[#e6f7ed] text-[#00a651] border-[#99d9b8]',
    'Pending': 'bg-[#ffe6e6] text-[#ff0000] border-[#ffb3b3]',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] border ${styles[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${
        status === 'In Progress' ? 'bg-[#0066cc]' :
        status === 'Scheduled' ? 'bg-[#ff9500]' :
        status === 'Completed' ? 'bg-[#00a651]' :
        'bg-[#ff0000]'
      }`} />
      <span className="text-[14px]">{status}</span>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: VehicleQueueRow['priority'] }) {
  const styles = {
    'Standard': 'bg-white text-[#0066cc] border-[#b3d9ff]',
    'Urgent': 'bg-white text-[#ff0000] border-[#ffb3b3]',
    'Express': 'bg-white text-[#ff9500] border-[#ffd699]',
    'Basic': 'bg-white text-[#999] border-[#e5e7eb]',
  };

  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-[20px] border ${styles[priority]}`}>
      <span className="text-[14px]">{priority}</span>
    </div>
  );
}

export function QCTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
  };

  const handleStartInspection = (_registration: string) => {
    navigate(ROUTES.QUALITY_CHECK_INSPECTION);
  };

  // Filter vehicles based on status filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Urgent") return vehicle.priority === "Urgent";
    if (statusFilter === "Delayed") return vehicle.status === "Pending" || vehicle.status === "In Progress";
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  const isEmpty = filteredVehicles.length === 0;

  // Reset to page 1 when filter changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-5">
      {/* Header */}
      <div className="mb-4 md:mb-5">
        <h2 className="text-[#333] text-[15px] md:text-[16px] font-semibold">Vehicle Queue</h2>
        <p className="text-[#999] text-[12px]">Vehicles awaiting quality inspection</p>
      </div>

      {/* Tabs and Filter */}
      <div className="flex flex-wrap items-center mb-5 gap-3">
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
            onClick={() => handleStatusFilterChange("Urgent")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Urgent"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
          }`}
          >
            Urgent
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("Delayed")}
            variant="secondary"
            className={`rounded-lg px-4 h-10! py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Delayed"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
          }`}
          >
            Delayed
          </Button>
        </div>
        <Button variant="outline" icon={<SlidersHorizontal className="w-4 h-4" />} className="text-[#333]">
          Filter
        </Button>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-black text-base">No Vehicle Found!</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-3 pr-5 text-[#333] text-[14px] font-normal">Vehicle Details</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Service Type</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Waiting Time</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Status</th>
                  <th className="text-left py-3 px-5 text-[#333] text-[14px] font-normal">Priority</th>
                  <th className="text-left py-3 pl-5 text-[#333] text-[14px] font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVehicles.map((vehicle, index) => (
                  <tr key={index} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#fafafa]">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
                          <img
                            src={truck}
                            alt="Vehicle"
                            className="max-w-17.5 object-contain "
                          />
                        </div>
                        <div>
                          <p className="text-[#333] text-[16px] mb-0.5">{vehicle.registration}</p>
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
                    <td>
                      <PriorityBadge priority={vehicle.priority} />
                    </td>
                    <td>
                      <Button variant="gradient" onClick={() => handleStartInspection(vehicle.registration)}>
                        Start Inspection
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Card Layout */}
          <div className="sm:block md:hidden space-y-3 mt-4">
            {paginatedVehicles.map((vehicle, index) => (
              <div key={index} className="border rounded-xl p-3">
                {/* Top Row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
                    <img
                      src={truck}
                      alt="Vehicle"
                      className="max-w-15 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333]">{vehicle.registration}</p>
                    <p className="text-xs text-[#999]">{vehicle.model}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <p className="text-[#999] text-xs">Service Type</p>
                    <p className="text-[#333]">{vehicle.serviceType}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Waiting Time</p>
                    <div className="flex items-center gap-1.5 text-[#999]">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.waitingTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Status</p>
                    <StatusBadge status={vehicle.status} />
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Priority</p>
                    <PriorityBadge priority={vehicle.priority} />
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Button variant="gradient" onClick={() => handleStartInspection(vehicle.registration)}>
                    Start Inspection
                  </Button>
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

