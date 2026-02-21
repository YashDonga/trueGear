import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StatCard } from "../../components/cards/StatCard.tsx";
import { VehicleLookup } from "../../components/cards/VehicleLookup.tsx";
import { Truck } from "lucide-react";
import { VehicleTable } from "../../components/cards/VehicleTable.tsx.tsx";
import { ROUTES } from "../../constants/routes.ts";
import type { VehicleStats } from "../../api/vehicle.api";

const SecurityDashboard: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<VehicleStats>({
    pendingInspection: 0,
    inProgress: 0,
    completed: 0,
    avgTimeInside: "0h 0m",
  });

  const isIndexRoute = location.pathname === ROUTES.SECURITY_DASHBOARD;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search triggered with query:", query);
  };

  return (
    <>
      {/* Dashboard Content - Only show on index route */}
      {isIndexRoute && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-7.5">
            <StatCard
              title="Vehicles Entered Today"
              value={String(stats.completed).padStart(2, "0")}
              change=""
              icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
            />
            <StatCard
              title="Currently Inside"
              value={String(stats.inProgress).padStart(2, "0")}
              change=""
              icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
            />
            <StatCard
              title="Pending Exit"
              value={String(stats.pendingInspection).padStart(2, "0")}
              change=""
              icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
            />
            <StatCard
              title="Avg. Time Inside"
              value={stats.avgTimeInside}
              change=""
              icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
            />
          </div>

          {/* Vehicle Lookup */}
          <div className="mb-6 lg:mb-7.5">
            <VehicleLookup
              onSearch={handleSearch}
            />
          </div>

          {/* Vehicle Table */}
          <div className="overflow-x-auto">
            <VehicleTable searchQuery={searchQuery} onStatsLoaded={setStats} />
          </div>
        </>
      )}

      {/* Outlet for child routes */}
      <Outlet />
    </>
  );
};

export default SecurityDashboard;
