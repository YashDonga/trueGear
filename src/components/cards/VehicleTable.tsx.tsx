import { Edit2, Trash2, MoreVertical } from "lucide-react";
import truck from "../../assets/truck.png";
import { Pagination } from "../common/Pagination";
import Button from "../common/Button";
import { DatePicker } from "../common/DatePicker";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";

interface Vehicle {
  id: string;
  registration: string;
  model: string;
  odometer: string;
  jobCard: string;
  entryTime: string;
  date: string;
  status: "In Queue" | "Ready" | "Completed" | "In Service";
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    registration: "BL 00 MY ZN",
    model: "Vehicle Model Name",
    odometer: "91308 KM",
    jobCard: "JC - 99830",
    entryTime: "10:30 AM",
    date: "30 JAN 26",
    status: "In Queue",
  },
  {
    id: "2",
    registration: "BL 01 MY ZN",
    model: "Model X",
    odometer: "45612 KM",
    jobCard: "JC - 99831",
    entryTime: "11:00 AM",
    date: "30 JAN 26",
    status: "Ready",
  },
  {
    id: "3",
    registration: "BL 02 MY ZN",
    model: "SUV Y",
    odometer: "12345 KM",
    jobCard: "JC - 99832",
    entryTime: "11:30 AM",
    date: "30 JAN 26",
    status: "Completed",
  },
  {
    id: "4",
    registration: "BL 03 MY ZN",
    model: "Coupe Z",
    odometer: "87654 KM",
    jobCard: "JC - 99833",
    entryTime: "12:00 PM",
    date: "30 JAN 26",
    status: "In Queue",
  },
  {
    id: "5",
    registration: "BL 04 MY ZN",
    model: "Hatchback A",
    odometer: "32109 KM",
    jobCard: "JC - 99834",
    entryTime: "12:30 PM",
    date: "30 JAN 26",
    status: "In Service",
  },
  {
    id: "6",
    registration: "BL 05 MY ZN",
    model: "Convertible B",
    odometer: "65432 KM",
    jobCard: "JC - 99835",
    entryTime: "01:00 PM",
    date: "30 JAN 26",
    status: "Completed",
  },
  {
    id: "7",
    registration: "BL 06 MY ZN",
    model: "Minivan C",
    odometer: "78901 KM",
    jobCard: "JC - 99836",
    entryTime: "01:30 PM",
    date: "30 JAN 26",
    status: "In Queue",
  },
];

const statusConfig = {
  "In Queue": { color: "text-[#0066FF]", bg: "bg-[#0066FF]" },
  Ready: { color: "text-[#FF8800]", bg: "bg-[#FF8800]" },
  Completed: { color: "text-[#00C853]", bg: "bg-[#00C853]" },
  "In Service": { color: "text-[#FF8800]", bg: "bg-[#FF8800]" },
};

type StatusFilter = "All" | "Inside" | "Pending Exit";

interface VehicleTableProps {
  searchQuery?: string;
}

export function VehicleTable({ searchQuery = "" }: VehicleTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [selectedDate, setSelectedDate] = useState<string>("2026-01-30");
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Status categories for filtering
  const insideStatuses = ["In Queue", "Ready", "In Service"];

  // Helper function to convert date format from "30 JAN 26" to "YYYY-MM-DD"
  const convertDateFormat = (dateStr: string): string => {
    const months: Record<string, string> = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
      JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };
    
    const parts = dateStr.split(" ");
    if (parts.length !== 3) return "";
    
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]] || "01";
    const year = "20" + parts[2];
    
    return `${year}-${month}-${day}`;
  };

  // Filter vehicles based on search query, status filter, and date filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = searchQuery
      ? vehicle.registration.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Inside"
          ? insideStatuses.includes(vehicle.status)
          : statusFilter === "Pending Exit"
            ? vehicle.status === "Completed"
            : true;

    const matchesDate = selectedDate
      ? convertDateFormat(vehicle.date) === selectedDate
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const isEmpty = filteredVehicles.length === 0;

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
  };

  const handleAddVehicle = () => {
    navigate(ROUTES.ADD_VEHICLE);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-5">
      {/* Header */}
      <div className="mb-4 md:mb-5">
        <h2 className="text-[#333] text-[15px] md:text-[16px] font-semibold">
          Vehicle Lookup
        </h2>
        <p className="text-[#999] text-[12px]">
          Enter the vehicle registration number to search
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2 bg-[#f5f5f5] p-1.25 rounded-[10px]">
          <Button
            onClick={() => handleStatusFilterChange("All")}
            variant="secondary"
            className={`rounded-lg px-4 py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "All"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
          }`}
          >
            All
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("Inside")}
            variant="secondary"
            className={`rounded-lg px-4 py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Inside"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
          }`}
          >
            Inside
          </Button>
          <Button
            onClick={() => handleStatusFilterChange("Pending Exit")}
            variant="secondary"
            className={`rounded-lg px-4 py-2 text-sm transition-colors focus:outline-none ${
              statusFilter === "Pending Exit"
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#f5f5f5]! text-gray-700! hover:bg-[#e8e8e8]!"
          }`}
          >
            Pending Exit
          </Button>
        </div>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          label="Date"
          className="cursor-pointer"
        />
      </div>

      {/* Empty State or Desktop / Tablet Table ===== */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-black text-base">No Vehicle Found!</p>
          <Button variant="secondary" onClick={handleAddVehicle}>
            + Add New Vehicle
          </Button>
        </div>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-sm text-[#666]">
                  <th className="text-left py-3">Vehicle Details</th>
                  <th className="text-left py-3">Odometer</th>
                  <th className="text-left py-3">Job Card</th>
                  <th className="text-left py-3">Entry Time</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
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
                          <p className="text-[#333]">{vehicle.registration}</p>
                          <p className="text-[#999] text-xs">{vehicle.model}</p>
                        </div>
                      </div>
                    </td>

                    <td>{vehicle.odometer}</td>
                    <td>{vehicle.jobCard}</td>

                    <td>
                      <p>{vehicle.entryTime}</p>
                      <p className="text-xs text-[#999]">{vehicle.date}</p>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${statusConfig[vehicle.status].bg}`}
                        />
                        <span className={statusConfig[vehicle.status].color}>
                          {vehicle.status}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Mobile / Tablet Card Layout ===== */}
          <div className="md:block lg:hidden space-y-3">
            {paginatedVehicles.map((vehicle) => (
              <div key={vehicle.id} className="border rounded-xl p-3">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-b from-[#ff4f31] to-[#fe2b73]" />
                    <div>
                      <p className="text-sm font-medium">
                        {vehicle.registration}
                      </p>
                      <p className="text-xs text-[#999]">{vehicle.model}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Edit2 size={16} />
                    <Trash2 size={16} />
                    <MoreVertical size={16} />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <p className="text-[#999] text-xs">Odometer</p>
                    <p>{vehicle.odometer}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Job Card</p>
                    <p>{vehicle.jobCard}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Entry</p>
                    <p>{vehicle.entryTime}</p>
                    <p className="text-xs text-[#999]">{vehicle.date}</p>
                  </div>

                  <div>
                    <p className="text-[#999] text-xs">Status</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${statusConfig[vehicle.status].bg}`}
                      />
                      <span
                        className={`text-sm ${statusConfig[vehicle.status].color}`}
                      >
                        {vehicle.status}
                      </span>
                    </div>
                  </div>
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

