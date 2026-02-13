import { StatCard } from "../../components/cards/StatCard.tsx";
import { Truck } from "lucide-react";
import { QCTable } from "../../components/cards/QCTable.tsx";

const QualityCheckDashboard: React.FC = () => {

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-7.5">
        <StatCard
          title="Pending Inspection"
          value="05"
          change="+12%"
          icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
        />
        <StatCard
          title="In Progress"
          value="12%"
          change="+12%"
          icon={<Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#BFBFBF]" strokeWidth={1.5} />}
        />
        <StatCard
          title="Completed Today"
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

      {/* QC Table */}
      <div className="overflow-x-auto">
        <QCTable />
      </div>
    </>
  );
};

export default QualityCheckDashboard;

