import React from "react";
import { StatCard } from "../../components/cards/StatCard";
import { VehicleLookup } from "../../components/cards/VehicleLookup";
import { Truck } from "lucide-react";
import { VehicleTable } from "../../components/cards/VehicleTable.tsx";
import { Pagination } from "../../components/common/Pagination.tsx";

const Dashboard: React.FC = () => (
  <>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-7.5">
      <StatCard
        title="Vehicles Entered Today"
        value="05"
        change="+12%"
        icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
      />
      <StatCard
        title="Currently Inside"
        value="12"
        change="+12%"
        icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
      />
      <StatCard
        title="Pending Exit"
        value="05"
        change="+12%"
        icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
      />
      <StatCard
        title="Avg. Time Inside"
        value="3h 41m"
        change="+12%"
        icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
      />
    </div>

    {/* Vehicle Lookup */}
    <div className="mb-6 lg:mb-7.5">
      <VehicleLookup />
    </div>

    {/* Vehicle Table */}
    <div className="overflow-x-auto">
      <VehicleTable />
    </div>

    {/* Pagination */}
    <div className="mt-4">
      <Pagination />
    </div>
  </>
);

export default Dashboard;
