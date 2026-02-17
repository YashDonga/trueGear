import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import {
  Clock,
  ChevronLeft,
  PlusCircle,
  Truck,
  ClipboardCheck,
  Check,
  AlertCircle,
  FileText,
  History,
} from "lucide-react";
import truckImg from "../../assets/truck.png";
import { cn } from "../../components/utils/cn";

interface ServiceHistoryItemProps {
  title: string;
  date: string;
  advisor: string;
  price: string;
  duration: string;
}
// Mock data - in real app, this would come from API
const mockVehicleData: Record<
  string,
  {
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
> = {
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

const steps = [
  { label: "Entry", icon: Truck, status: "completed" },
  { label: "QC", icon: ClipboardCheck, status: "completed" },
  { label: "Approval", icon: Check, status: "current" },
  { label: "Service", icon: AlertCircle, status: "pending" },
  { label: "Billing", icon: FileText, status: "pending" },
];

const tabs = [
  { label: "Vehicle History", icon: History, key: "vehicleHistory" },
  { label: "QC Report", icon: ClipboardCheck, key: "qcReport" },
  { label: "Job Card", icon: FileText, key: "jobCard" },
];

const historyItems = [
  {
    title: "General Service",
    date: "15 Dec 2025",
    advisor: "Ramesh K.",
    price: "₹8,500",
    duration: "3h 20m",
  },
  {
    title: "AC Repair",
    date: "02 Sep 2025",
    advisor: "Sunil M.",
    price: "₹4,200",
    duration: "2h 15m",
  },
  {
    title: "Brake Pad Replacement",
    date: "18 May 2025",
    advisor: "Ramesh K.",
    price: "₹8,500",
    duration: "1h 45m",
  },
];

type Status = "pass" | "fail" | "warning";

interface QCItemProps {
  label: string;
  subLabel?: string;
  status: Status;
  statusText?: string;
}

const QCItem = ({ label, subLabel, status, statusText }: QCItemProps) => {
  const getStatusColor = (s: Status) => {
    switch (s) {
      case "pass":
        return "bg-[#B3FFBD] text-[#347308] border-[#fff]";
      case "fail":
        return "bg-[#FFC7C7] text-[#D40920] border-[#fff]";
      case "warning":
        return "bg-[#FFE1B7] text-[#E89D00] border-[#fff]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (s: Status) => {
    if (statusText) return statusText;
    switch (s) {
      case "pass":
        return "Pass";
      case "fail":
        return "Fail";
      case "warning":
        return "Warning";
      default:
        return "";
    }
  };

  return (
    <div className="bg-[#F6F6F6] rounded-lg p-3 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {subLabel && <p className="text-xs text-gray-400 mt-0.5">{subLabel}</p>}
      </div>
      <span
        className={cn(
          "text-[10px] font-bold px-2.5 py-1.25 rounded border uppercase tracking-wide",
          getStatusColor(status),
        )}
      >
        {getStatusLabel(status)}
      </span>
    </div>
  );
};

const ServiceHistoryItem = ({
  title,
  date,
  advisor,
  price,
  duration,
}: ServiceHistoryItemProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-b from-[#ff4f31] to-[#fe2b73] flex items-center justify-center text-white shadow-md shadow-red-100 shrink-0">
          <FileText size={18} strokeWidth={2} className="md:w-5 md:h-5" />
        </div>
        <div>
          <h4 className="text-sm md:text-base font-semibold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-400 mt-0.5 md:mt-1">
            {date} - {advisor}
          </p>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-sm md:text-base font-semibold text-gray-800">{price}</p>
        <p className="text-xs text-gray-400 mt-0.5 md:mt-1">{duration}</p>
      </div>
    </div>
  );
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

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={16} />
            <span>Back to List</span>
          </button>
          <span className="bg-[#b8ecf0] text-[#0061ff] text-xs font-semibold px-3 py-1.5 rounded-md">
            QC Complete
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">BL 00 MY ZN</h2>
          <p className="text-sm text-gray-400">Vehicle Modal Name</p>
        </div>
        {/* Vehicle Detail Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden shrink-0">
              <img
                src={truckImg}
                alt="Vehicle"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Vikram Mehta
              </h3>
              <p className="text-xs text-gray-400">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Button
              variant="custom"
              customStyles={{
                background: "white",
                border: "#e5e7eb",
                text: "#1f2937",
                hoverBg: "#f9fafb",
              }}
              icon={<Clock size={16} />}
              className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 w-full sm:w-auto"
            >
              Call Customer
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "#ff4f31", to: "#fe2b73", direction: "to-b" }}
              icon={<PlusCircle size={16} />}
              className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-red-200 w-full sm:w-auto"
            >
              Create Job Card
            </Button>
          </div>
        </div>
        {/* Service Progress Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8 shadow-sm overflow-x-auto scrollbar-hide">
          <h3 className="text-base font-semibold text-gray-800 mb-6 md:mb-8 min-w-max">
            Service Progress
          </h3>

          {/* Progress Steps Container */}
          <div className="relative pt-2 min-w-max">
            {/* Background Line */}
            <div className="absolute top-6.5 md:top-7.5 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
            {/* Active Progress Line */}
            <div
              className="absolute top-6.5 md:top-7.5 left-0 h-1.5 rounded-full bg-linear-to-r from-[#ff4f31] to-[#fe2b73]"
              style={{ width: "50%" }}
            />

            {/* Steps */}
            <div className="flex justify-between relative z-10 gap-2 md:gap-0">
              {steps.map((step, index) => {
                const isFirst = index === 0;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col gap-2 md:gap-3",
                      isFirst
                        ? "items-start"
                        : isLast
                          ? "items-end"
                          : "items-center",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                        step.status === "completed" || step.status === "current"
                          ? "bg-linear-to-b from-[#ff4f31] to-[#fe2b73] border-transparent text-white"
                          : "bg-white border-gray-200 text-gray-400",
                      )}
                    >
                      <step.icon size={16} strokeWidth={2} className="md:w-5 md:h-5" />
                    </div>

                    <span className="text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap">
                      {isFirst ? "Start" : isLast ? "End" : step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Tab */}
        <div className="flex items-center gap-2 mb-6 bg-[#EFEFEF] p-1.5 rounded-xl w-full md:w-max overflow-x-auto md:overflow-visible scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0",
                activeTab === tab.key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200",
              )}
            >
              <tab.icon size={14} strokeWidth={2} className="md:w-4 md:h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.key === "vehicleHistory" ? "Vehicle History" : tab.key === "qcReport" ? "QC Report" : "Job Card"}</span>
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {activeTab === "qcReport" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Exterior Column */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                Exterior
              </h4>
              <div className="flex flex-col gap-3">
                <QCItem
                  label="Body panels condition"
                  subLabel="Good condition"
                  status="pass"
                />
                <QCItem
                  label="Paint condition & scratches"
                  subLabel="Good condition"
                  status="warning"
                />
                <QCItem label="Windshield & windows" status="pass" />
                <QCItem label="Headlights & taillights" status="pass" />
                <QCItem
                  label="Tyres & wheel condition"
                  subLabel="Front left tyre wear 60%"
                  status="warning"
                />
                <QCItem label="Side mirrors" status="pass" />
              </div>
            </div>

            {/* Interior & Engine Column */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                Interior & Engine
              </h4>
              <div className="flex flex-col gap-3">
                <QCItem label="Dashboard condition" status="pass" />
                <QCItem label="Seat condition" status="pass" />
                <QCItem
                  label="AC vents & controls"
                  subLabel="AC not cooling properly"
                  status="fail"
                />
                <QCItem label="Steering & gear lever" status="pass" />
                <QCItem label="Infotainment system" status="pass" />
                <QCItem label="Engine bay inspection" status="pass" />
              </div>
            </div>

            {/* Brake Column */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                Brakes
              </h4>
              <div className="flex flex-col gap-3">
                <QCItem label="Brake pedal response" status="pass" />
                <QCItem label="Handbrake function" status="pass" />
                <QCItem
                  label="Brake fluid level"
                  subLabel="Level slightly low"
                  status="warning"
                />
                <QCItem label="Brake pad wear" status="pass" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "vehicleHistory" && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="mb-4 md:mb-6">
              <h3 className="text-base font-semibold text-gray-800">
                Service Progress
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Previous service for this vehicle
              </p>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              {historyItems.map((item, index) => (
                <ServiceHistoryItem key={index} {...item} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "jobCard" && (
          <div className="bg-white border border-gray-200 rounded-xl min-h-[220px] md:h-87.5 flex flex-col items-center justify-center gap-4 md:gap-6 shadow-sm w-full p-4 md:p-0">
            <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-[#fbfbfb] border border-[#bfbfbf] flex items-center justify-center">
              <FileText
                size={24}
                className="text-[#cacaca]"
                strokeWidth={1.5}
              />
            </div>

            <p className="text-sm md:text-base font-medium text-[#333]">
              No job card created yet
            </p>

            <Button variant="gradient" className="w-full sm:w-auto">Create Job Card</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceAdvisorVehicleDetail;
