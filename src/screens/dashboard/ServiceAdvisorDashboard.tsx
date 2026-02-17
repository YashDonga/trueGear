import { StatCard } from "../../components/cards/StatCard.tsx";
import { Truck, Clock, CheckCircle, Calendar } from "lucide-react";
import { ServiceAdvisorTable } from "../../components/cards/ServiceAdvisorTable.tsx";
import { Outlet, useLocation } from "react-router-dom";
import ROUTES from "../../constants/routes.ts";

const ServiceAdvisorDashboard: React.FC = () => {
  const location = useLocation();
  const isIndexRoute = location.pathname === ROUTES.SERVICE_ADVISOR_DASHBOARD;

  return (
    <>
      {isIndexRoute && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-7.5">
            <StatCard
              title="QC Complete"
              value="05"
              change="+12%"
              icon={
                <CheckCircle
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]"
                  strokeWidth={1.5}
                />
              }
            />
            <StatCard
              title="Awaiting Approval"
              value="12"
              change="+12%"
              icon={
                <Calendar
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]"
                  strokeWidth={1.5}
                />
              }
            />
            <StatCard
              title="In Service"
              value="05"
              change="+12%"
              icon={
                <Truck
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]"
                  strokeWidth={1.5}
                />
              }
            />
            <StatCard
              title="Ready for Billing"
              value="03"
              change="+12%"
              icon={
                <Clock
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]"
                  strokeWidth={1.5}
                />
              }
            />
          </div>

          {/* Service Queue Table */}
          <div className="overflow-x-auto">
            <ServiceAdvisorTable />
          </div>
        </>
      )}

      {/* Render child routes */}
      <Outlet />
    </>
  );
};

export default ServiceAdvisorDashboard;
