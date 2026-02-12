import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/cards/StatCard.tsx";
import { VehicleLookup } from "../../components/cards/VehicleLookup.tsx";
import { Truck } from "lucide-react";
import { VehicleTable } from "../../components/cards/VehicleTable.tsx.tsx";
import { ROUTES } from "../../constants/routes.ts";

const SecurityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search triggered with query:", query);
  };

  const handleAddVehicle = () => {
    navigate(ROUTES.ADD_VEHICLE);
  };

  return (
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
        <VehicleLookup
          onSearch={handleSearch}
          onAddVehicle={handleAddVehicle}
        />
      </div>

      {/* Vehicle Table */}
      <div className="overflow-x-auto">
        <VehicleTable searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default SecurityDashboard;

