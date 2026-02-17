import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { BackButton } from "../../components/cards/BackButton";
import { VehicleInfoBar } from "../../components/cards/VehicleInfoBar";
import { ServiceProgress } from "../../components/cards/ServiceProgress";
import { TabNavigation } from "../../components/cards/TabNavigation";
import { QCReport } from "../../components/cards/QCReport";
import { VehicleHistory } from "../../components/cards/VehicleHistory";
import { JobCardEmpty } from "../../components/cards/JobCardEmpty";

interface VehicleData {
  id: string;
  registration: string;
  model: string;
  serviceType: string;
  advisor: string;
  waitingTime: string;
  status: string;
  customerName: string;
  customerPhone: string;
  odometer: string;
  fuelLevel: string;
  entryDate: string;
}

// Mock data - in real app, this would come from API
const mockVehicleData: Record<string, VehicleData> = {
  "1": {
    id: "1",
    registration: "BL 00 MY ZN",
    model: "Vehicle Model Name",
    serviceType: "Standard Service",
    advisor: "John Doe",
    waitingTime: "45 Mins",
    status: "In Service",
    customerName: "John Customer",
    customerPhone: "+91 98765 43210",
    odometer: "45,000 km",
    fuelLevel: "50%",
    entryDate: "2024-01-15",
  },
  "2": {
    id: "2",
    registration: "BL 01 MY ZN",
    model: "Vehicle Model X",
    serviceType: "Premium Service",
    advisor: "Jane Smith",
    waitingTime: "60 Mins",
    status: "Awaiting Approval",
    customerName: "Jane Customer",
    customerPhone: "+91 98765 43211",
    odometer: "32,000 km",
    fuelLevel: "75%",
    entryDate: "2024-01-14",
  },
  "3": {
    id: "3",
    registration: "BL 02 MY ZN",
    model: "Vehicle Model Y",
    serviceType: "Standard Service",
    advisor: "John Doe",
    waitingTime: "30 Mins",
    status: "QC Complete",
    customerName: "Mike Customer",
    customerPhone: "+91 98765 43212",
    odometer: "28,000 km",
    fuelLevel: "40%",
    entryDate: "2024-01-13",
  },
  "4": {
    id: "4",
    registration: "BL 03 MY ZN",
    model: "Vehicle Model Z",
    serviceType: "Express Service",
    advisor: "Mike Johnson",
    waitingTime: "20 Mins",
    status: "Ready for Billing",
    customerName: "Sarah Customer",
    customerPhone: "+91 98765 43213",
    odometer: "55,000 km",
    fuelLevel: "60%",
    entryDate: "2024-01-12",
  },
  "5": {
    id: "5",
    registration: "BL 04 MY ZN",
    model: "Vehicle Model A",
    serviceType: "Comprehensive Service",
    advisor: "Jane Smith",
    waitingTime: "90 Mins",
    status: "In Service",
    customerName: "Alex Customer",
    customerPhone: "+91 98765 43214",
    odometer: "12,000 km",
    fuelLevel: "80%",
    entryDate: "2024-01-11",
  },
  "6": {
    id: "6",
    registration: "BL 05 MY ZN",
    model: "Vehicle Model B",
    serviceType: "Basic Service",
    advisor: "Mike Johnson",
    waitingTime: "25 Mins",
    status: "Awaiting Approval",
    customerName: "Chris Customer",
    customerPhone: "+91 98765 43215",
    odometer: "67,000 km",
    fuelLevel: "30%",
    entryDate: "2024-01-10",
  },
  "7": {
    id: "7",
    registration: "BL 06 MY ZN",
    model: "Vehicle Model C",
    serviceType: "Standard Service",
    advisor: "John Doe",
    waitingTime: "35 Mins",
    status: "QC Complete",
    customerName: "Emma Customer",
    customerPhone: "+91 98765 43216",
    odometer: "41,000 km",
    fuelLevel: "55%",
    entryDate: "2024-01-09",
  },
  "8": {
    id: "8",
    registration: "BL 07 MY ZN",
    model: "Vehicle Model D",
    serviceType: "Premium Service",
    advisor: "Jane Smith",
    waitingTime: "50 Mins",
    status: "Ready for Billing",
    customerName: "David Customer",
    customerPhone: "+91 98765 43217",
    odometer: "38,000 km",
    fuelLevel: "45%",
    entryDate: "2024-01-08",
  },
};

const ServiceAdvisorVehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("qcReport");

  const vehicle = id ? mockVehicleData[id] : null;

  if (!vehicle) {
    return (
      <>
        <Breadcrumb
          items={[{ label: "Service Advisor" }, { label: "Vehicle Details" }]}
        />
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-[#333] text-lg">Vehicle not found</p>
          <Button
            variant="gradient"
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </>
    );
  }

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "qcReport":
        return <QCReport />;
      case "vehicleHistory":
        return <VehicleHistory />;
      case "jobCard":
        return <JobCardEmpty onButtonClick={() => navigate(`/create-job-card/${id}`)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={() => navigate(-1)} />
          <span className="bg-[#b8ecf0] text-[#0061ff] text-xs font-semibold px-3 py-1.5 rounded-md">
            {vehicle.status}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{vehicle.registration}</h2>
          <p className="text-sm text-gray-400">{vehicle.model}</p>
        </div>

        <VehicleInfoBar
          customerName={vehicle.customerName}
          customerPhone={vehicle.customerPhone}
        />

        <ServiceProgress />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {renderTabContent()}
      </div>
    </>
  );
};

export default ServiceAdvisorVehicleDetail;

