import { useState } from "react";
import { PartRequestCard } from "../../components/cards/PartRequestCard.tsx";
import { StatCard } from "../../components/cards/StatCard.tsx";
import { AlertTriangle, Clock, Check, Send } from "lucide-react";

interface PartRequest {
  id: string;
  partName: string;
  partNumber: string;
  vehicleNumber: string;
  vehicleModel: string;
  serviceDescription: string;
  status: "pending" | "available" | "unavailable" | "dispatched";
  requestTime: string;
  showDispatchInfo?: boolean;
  expectedTime?: string;
}

const SparePartsDashboard = () => {
  const [partRequests, setPartRequests] = useState<PartRequest[]>([
    {
      id: "1",
      partName: "Refrigerant Gas R134a",
      partNumber: "TYN-AC-001 • Qty: 3",
      vehicleNumber: "KA-01-AB-1234",
      vehicleModel: "Toyota Innova Crysta",
      serviceDescription: "AC Gas Refill & Cooling Check",
      status: "pending",
      requestTime: "10:45 AM",
    },
    {
      id: "2",
      partName: "Compressor Seal Kit",
      partNumber: "TYT-AC-346 • Qty: 1",
      vehicleNumber: "KA-01-AB-1234",
      vehicleModel: "Toyota Innova Crysta",
      serviceDescription: "Job: AC Compressor Inspection",
      status: "pending",
      requestTime: "10:45 AM",
    },
    {
      id: "3",
      partName: "Oil Filter",
      partNumber: "HON-OF-123 • Qty: 1",
      vehicleNumber: "MH-12-CD-5678",
      vehicleModel: "Honda City",
      serviceDescription: "Oil Filter Replacement",
      status: "available",
      requestTime: "11:53 AM",
    },
    {
      id: "4",
      partName: "Engine Oil 5W-30 (4L)",
      partNumber: "GEN-OL-530 • Qty: 1",
      vehicleNumber: "MH-12-CD-5678",
      vehicleModel: "Honda City",
      serviceDescription: "Oil Filter Replacement",
      status: "dispatched",
      requestTime: "11:13 AM",
      showDispatchInfo: true,
    },
    {
      id: "5",
      partName: "Front Brake Pads",
      partNumber: "MAR-BR-242 • Qty: 1",
      vehicleNumber: "KA-05-FF-9612",
      vehicleModel: "Maruti Swift",
      serviceDescription: "Brake Pad Replacement",
      status: "unavailable",
      requestTime: "9:30 AM",
      expectedTime: "Tomorrow 10:00 AM",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleMarkAvailable = (id: string) => {
    setPartRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "available" as const } : req,
      ),
    );
  };

  const handleDispatch = (id: string) => {
    setPartRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "dispatched" as const, showDispatchInfo: true }
          : req,
      ),
    );
  };

  const filteredRequests =
    filterStatus === "all"
      ? partRequests
      : partRequests.filter((req) => req.status === filterStatus);
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-7.5">
        <StatCard
          title="Pending"
          value="02"
          change=""
          icon={
            <Clock
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#E89D00]"
              strokeWidth={1.5}
            />
          }
        />
        <StatCard
          title="Available"
          value="01"
          change=""
          icon={
            <Check
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]"
              strokeWidth={1.5}
            />
          }
        />
        <StatCard
          title="Unavailable"
          value="01"
          change=""
          icon={
            <AlertTriangle
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#FE2B73]"
              strokeWidth={1.5}
            />
          }
        />
        <StatCard
          title="Dispatched"
          value="01"
          change=""
          icon={
            <Send
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#0061FF]"
              strokeWidth={1.5}
            />
          }
        />
      </div>

      <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#999]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
            <input
              type="text"
              placeholder="Search parts, vehicles..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#e5e7eb] rounded-lg text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ff4f31] focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 border border-[#e5e7eb] rounded-lg text-[13px] sm:text-[14px] font-medium text-[#333] focus:outline-none focus:ring-2 focus:ring-[#ff4f31] focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="dispatched">Dispatched</option>
          </select>
        </div>
      </div>

      {/* Spare Parts Table */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-[14px] sm:text-[16px] font-semibold text-[#333] mb-1">
          Part Requests
        </h2>
        <p className="text-[12px] sm:text-[14px] text-[#999] mb-3 sm:mb-4">
          {filteredRequests.length} request(s)
        </p>

        <div className="space-y-3 sm:space-y-4">
          {filteredRequests.map((request) => (
            <PartRequestCard
              key={request.id}
              partName={request.partName}
              partNumber={request.partNumber}
              vehicleNumber={request.vehicleNumber}
              vehicleModel={request.vehicleModel}
              serviceDescription={request.serviceDescription}
              status={request.status}
              requestTime={request.requestTime}
              onMarkAvailable={
                request.status === "pending"
                  ? () => handleMarkAvailable(request.id)
                  : undefined
              }
              onDispatch={
                request.status === "available"
                  ? () => handleDispatch(request.id)
                  : undefined
              }
              showDispatchInfo={request.showDispatchInfo}
              expectedTime={request.expectedTime}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SparePartsDashboard;
