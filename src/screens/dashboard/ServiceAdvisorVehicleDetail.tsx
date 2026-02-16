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
} from "lucide-react";
import truckImg from "../../assets/truck.png";
import { cn } from "../../components/utils/cn";

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

const ServiceAdvisorVehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
              <img
                src={truckImg}
                alt="Vehicle"
                className="max-w-17.5 object-contain "
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Vikram Mehta
              </h3>
              <p className="text-xs text-gray-400">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="custom"
              customStyles={{
                background: "white",
                border: "#e5e7eb",
                text: "#1f2937",
                hoverBg: "#f9fafb",
              }}
              icon={<Clock size={16} />}
              className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200"
            >
              Call Customer
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "#ff4f31", to: "#fe2b73", direction: "to-b" }}
              icon={<PlusCircle size={16} />}
              className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-red-200"
            >
              Create Job Card
            </Button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-8">
            Service Progress
          </h3>

          <div className="flex items-center justify-between relative ">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 relative flex-1 z-10"
              >
                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-6 left-[50%] w-full h-1.5 -z-10 rounded-full",
                      index < 2
                        ? "bg-linear-to-r from-[#ff4f31] to-[#fe2b73]"
                        : "bg-gray-200",
                    )}
                  />
                )}

                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                    step.status === "completed" || step.status === "current"
                      ? "bg-linear-to-b from-[#ff4f31] to-[#fe2b73] border-transparent text-white"
                      : "bg-white border-gray-200 text-gray-400",
                  )}
                >
                  <step.icon size={20} strokeWidth={2} />
                </div>

                <span className="text-sm font-medium text-gray-800 mt-2">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceAdvisorVehicleDetail;
