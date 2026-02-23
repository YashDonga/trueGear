import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BackButton } from "../../components/cards/BackButton";
import { ArrowLeft } from "lucide-react";
import { VehicleCard } from "../../components/cards/VehicleCard";
import { TimerCard } from "../../components/cards/TimerCard";
import { JobChecklist } from "../../components/cards/JobChecklist";

interface Task {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
}

interface JobDetail {
  id: string;
  vehicleNumber: string;
  vehicleModel: string;
  bayNumber: string;
  customerName: string;
  customerPhone: string;
  status: "pending" | "progress" | "completed";
  entryDate: string;
  serviceType: string;
  tasks: Task[];
}

// Mock data - in real app, this would come from API
const mockJobData: Record<string, JobDetail> = {
  "1": {
    id: "1",
    vehicleNumber: "KA-01-AB-1234",
    vehicleModel: "Toyota Innova Crysta",
    bayNumber: "Bay 3",
    customerName: "John Doe",
    customerPhone: "+91 98765 43210",
    status: "pending",
    entryDate: "2024-01-15",
    serviceType: "Standard Service",
    tasks: [
      {
        id: "t1",
        name: "Oil Change",
        description: "Replace engine oil and filter",
        isCompleted: false,
      },
      {
        id: "t2",
        name: "Brake Inspection",
        description: "Check brake pads and discs",
        isCompleted: false,
      },
      {
        id: "t3",
        name: "Tire Rotation",
        description: "Rotate all four tires",
        isCompleted: false,
      },
    ],
  },
  "2": {
    id: "2",
    vehicleNumber: "KA-01-AB-1234",
    vehicleModel: "Toyota Innova Crysta",
    bayNumber: "Bay 3",
    customerName: "Jane Smith",
    customerPhone: "+91 98765 43211",
    status: "progress",
    entryDate: "2024-01-15",
    serviceType: "Premium Service",
    tasks: [
      {
        id: "t1",
        name: "Oil Change",
        description: "Replace engine oil and filter",
        isCompleted: true,
      },
      {
        id: "t2",
        name: "Brake Inspection",
        description: "Check brake pads and discs",
        isCompleted: true,
      },
      {
        id: "t3",
        name: "Tire Rotation",
        description: "Rotate all four tires",
        isCompleted: false,
      },
    ],
  },
  "3": {
    id: "3",
    vehicleNumber: "KA-01-AB-1234",
    vehicleModel: "Toyota Innova Crysta",
    bayNumber: "Bay 3",
    customerName: "Mike Johnson",
    customerPhone: "+91 98765 43212",
    status: "completed",
    entryDate: "2024-01-14",
    serviceType: "Express Service",
    tasks: [
      {
        id: "t1",
        name: "Oil Change",
        description: "Replace engine oil and filter",
        isCompleted: true,
      },
      {
        id: "t2",
        name: "Brake Inspection",
        description: "Check brake pads and discs",
        isCompleted: true,
      },
      {
        id: "t3",
        name: "Tire Rotation",
        description: "Rotate all four tires",
        isCompleted: true,
      },
    ],
  },
};

const TechnicianJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = id ? mockJobData[id] : null;

  const [checklistItems, setChecklistItems] = useState([
    { id: "1", title: "AC Gas Refill & Cooling Check", completed: true },
    { id: "2", title: "AC Compressor Inspection", completed: false },
    { id: "3", title: "AC Performance test", completed: false },
  ]);

  const handleToggleItem = (id: string) => {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleStartTimer = () => {
    console.log("Timer started");
  };

  if (!job) {
    return (
      <>
        <BackButton onClick={() => navigate(-1)} />
        <div className="bg-white rounded-xl p-8 text-center mt-4">
          <p className="text-[#333] text-lg">Job not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Back to Jobs */}
      <button className="flex items-center gap-2 mb-5 text-[#999] hover:text-[#333] transition-colors">
        <ArrowLeft size={16} />
        <span className="font-normal text-[14px]">Back to Jobs</span>
      </button>

      {/* Vehicle Header */}
      <div className="flex items-center justify-between mb-7.5">
        <div>
          <h2 className="font-semibold text-[24px] text-[#333] leading-[1.2] mb-1.25">
            KA-01-AB-1234
          </h2>
          <p className="font-normal text-[16px] text-[#999] leading-[1.2]">
            Toyota Innova Crysta
          </p>
        </div>

        {/* Status Badge */}
        <div className="bg-[#ffe1b7] px-6 py-2.5 rounded-lg">
          <span className="font-semibold text-[16px] text-[#e89d00]">
            Pending
          </span>
        </div>
      </div>

      {/* Vehicle Cards Row */}
      <div className="grid grid-cols-2 gap-6 mb-7.5">
        <VehicleCard
          vehicleNumber="KA-01-AB-1234"
          vehicleName="Toyota Innova Crysta"
        />
        <VehicleCard
          vehicleNumber="KA-01-AB-1234"
          vehicleName="Toyota Innova Crysta"
        />
      </div>

      {/* Timer Card */}
      <div className="mb-7.5">
        <TimerCard
          time="0m 0s"
          status="Timer paused"
          onStart={handleStartTimer}
        />
      </div>
      {/* Job Checklist */}
        <JobChecklist 
          items={checklistItems} 
          onToggle={handleToggleItem}
        />
    </>
  );
};

export default TechnicianJobDetail;
