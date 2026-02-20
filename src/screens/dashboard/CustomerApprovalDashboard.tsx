import { useState } from "react";
import { PendingApprovalCard } from "../../components/cards/PendingApprovalCard";
import { CustomerInfo } from "../../components/cards/CustomerInfo";
import { JobCard } from "../../components/cards/JobCard";
import { PricingSummary } from "../../components/cards/PricingSummary";
import Button from "../../components/common/Button";
import { Check, Clock, SquarePen } from "lucide-react";
import { SuccessIcon } from "../../assets/SuccessIcon";

interface Job {
  id: number;
  title: string;
  description: string;
  details: string;
  price: number;
  selected: boolean;
}

interface PendingApproval {
  id: number;
  vehicleNumber: string;
  vehicleModel: string;
  customerName: string;
  customerPhone: string;
  timeAgo: string;
  sentDate: string;
  sentTime: string;
  jobs: Job[];
}

const initialPendingApprovals: PendingApproval[] = [
  {
    id: 1,
    vehicleNumber: "KA-01-AB-1234",
    vehicleModel: "Toyota Innova Crysta",
    customerName: "Vikram Mehta",
    customerPhone: "+91 98765 43210",
    timeAgo: "Sent 2h ago",
    sentDate: "28 Jan 2026",
    sentTime: "10:30 AM",
    jobs: [
      {
        id: 1,
        title: "AC Gas Refill & Cooling Check",
        description: "Refrigerant Gas R134a",
        details: "Parts: ₹1,500 | Labor: ₹500",
        price: 2000,
        selected: true,
      },
      {
        id: 2,
        title: "AC Compressor Inspection",
        description: "Compressor Seal Kit",
        details: "Parts: ₹800 | Labour: ₹1,200",
        price: 2000,
        selected: true,
      },
      {
        id: 3,
        title: "Oil Filter Replacement",
        description: "Oil Filter, Engine Oil (4L)",
        details: "Parts: ₹2,500 | Labour: ₹400",
        price: 2900,
        selected: false,
      },
      {
        id: 4,
        title: "Brake Fluid Top-up",
        description: "Brake Fluid DOT 4",
        details: "Parts: ₹400 | Labour: ₹200",
        price: 600,
        selected: false,
      },
    ],
  },
  {
    id: 2,
    vehicleNumber: "MH-12-CD-5678",
    vehicleModel: "Honda City",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 12345",
    timeAgo: "Sent 4h ago",
    sentDate: "28 Jan 2026",
    sentTime: "08:15 AM",
    jobs: [
      {
        id: 1,
        title: "Full Service",
        description: "Complete car service",
        details: "Parts: ₹3,000 | Labour: ₹800",
        price: 3800,
        selected: true,
      },
      {
        id: 2,
        title: "Tire Rotation & Alignment",
        description: "Wheel alignment check",
        details: "Parts: ₹500 | Labour: ₹300",
        price: 800,
        selected: true,
      },
      {
        id: 3,
        title: "Battery Check",
        description: "Battery health inspection",
        details: "Parts: ₹200 | Labour: ₹100",
        price: 300,
        selected: false,
      },
    ],
  },
];

interface ActionButtonsProps {
  selectedCount: number;
  total: number;
  onRequestModification: () => void;
  onApprove: () => void;
}

function ActionButtons({ selectedCount, total, onRequestModification, onApprove }: ActionButtonsProps) {
  return (
    <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col gap-1.5">
          <p className="text-[14px] sm:text-[16px] font-semibold text-[#333]">{selectedCount} job(s) selected</p>
          <p className="text-[12px] text-[#999]">Total: ₹{total.toLocaleString()}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onRequestModification}
            className="bg-white flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-[5px] border border-[#e5e7eb] hover:bg-gray-50 transition-colors"
          >
            <SquarePen size={20} color="#333" />
            <span className="text-[14px] sm:text-[16px] font-medium text-[#333]">Request Modification</span>
          </button>
          <button
            onClick={onApprove}
            disabled={selectedCount === 0}
            className={`bg-[#1db401] flex items-center justify-center gap-2.5 px-5 sm:px-8 py-3 sm:py-3.25 rounded-[10px] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] transition-all ${
              selectedCount === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19a001]"
            }`}
          >
            <Check size={20} color="#fff" />
            <span className="text-[14px] sm:text-[16px] font-medium text-white">Approve Selected Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Request Modification Screen Component
interface RequestModificationScreenProps {
  approval: PendingApproval;
  selectedJobs: Job[];
  total: number;
  onBack: () => void;
  onSubmit: (notes: string) => void;
}

function RequestModificationScreen({ onBack, onSubmit }: RequestModificationScreenProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Notes Textarea */}
      <div>
        <label className="text-[14px] font-medium text-[#333] block mb-2">Modification Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter details about the requested modification..."
          className="w-full h-32 p-3 border border-[#e5e7eb] rounded-[5px] text-[14px] text-[#333] placeholder-[#999] focus:outline-none focus:border-[#0066FF] resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button variant="outline" className="flex-1 rounded-[5px]" onClick={onBack}>
          Cancel
        </Button>
        <Button variant="gradient" className="flex-1 rounded-[10px]" onClick={() => onSubmit(notes)}>
          Submit Request
        </Button>
      </div>
    </div>
  );
}

// Approve Screen Component
interface ApproveScreenProps {
  selectedJobs: Job[];
  total: number;
}

function ApproveScreen({ selectedJobs, total }: ApproveScreenProps) {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center max-w-292 w-full">
        {/* Success Icon */}
        <div className="mb-8 sm:mb-12">
          <SuccessIcon />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-[20px] sm:text-[24px] font-semibold text-[#333]">
            Approval confirmed
          </h1>
        </div>

        {/* Description */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[16px] sm:text-[18px] text-[#999] leading-[1.3]">
            Thank you for approving the service.
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#999] leading-[1.3]">
            Your vehicle service will begin shortly.
          </p>
        </div>

        {/* Jobs Approved Button */}
        <div className="bg-[#1db401] px-6 sm:px-8 py-3 sm:py-3.25 rounded-[10px] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] mb-8 sm:mb-12">
          <p className="text-[14px] sm:text-[16px] font-medium text-white">
            {selectedJobs.length} Jobs Approved
          </p>
        </div>

        {/* Approved Total */}
        <div className="flex items-center justify-between w-full max-w-83.5 mb-8 sm:mb-10">
          <p className="text-[14px] sm:text-[16px] font-medium text-[#333]">
            Approved Total
          </p>
          <p className="text-[14px] sm:text-[16px] font-medium text-[#333]">
            ₹{total.toLocaleString()}
          </p>
        </div>

        {/* SMS Updates Message */}
        <div className="text-center">
          <p className="text-[16px] sm:text-[18px] text-[#999] leading-[1.3]">
            You will receive updates on your service progress via SMS
          </p>
        </div>
      </div>
    </div>
  );
}

type ScreenType = 'dashboard' | 'requestModification' | 'approve';

function CustomerApprovalDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>(initialPendingApprovals);
  const [selectedApprovalId, setSelectedApprovalId] = useState<number | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');

  const selectedApproval = pendingApprovals.find(function(approval) {
    return approval.id === selectedApprovalId;
  });

  const jobs = selectedApproval ? selectedApproval.jobs : [];

  function toggleJob(jobId: number) {
    if (!selectedApproval) return;

    setPendingApprovals(
      pendingApprovals.map(function(approval) {
        if (approval.id === selectedApprovalId) {
          return Object.assign({}, approval, {
            jobs: approval.jobs.map(function(job) {
              if (job.id === jobId) {
                return Object.assign({}, job, { selected: !job.selected });
              }
              return job;
            }),
          });
        }
        return approval;
      })
    );
  }

  const selectedJobs = jobs.filter(function(job) {
    return job.selected;
  });
  const selectedCount = selectedJobs.length;
  const subtotal = selectedJobs.reduce(function(sum, job) {
    return sum + job.price;
  }, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  function handleCardClick(approvalId: number) {
    if (approvalId === selectedApprovalId) {
      setSelectedApprovalId(null);
    } else {
      setSelectedApprovalId(approvalId);
    }
  }

  function handleRequestModification() {
    if (selectedCount > 0) {
      setCurrentScreen('requestModification');
    }
  }

  function handleApprove() {
    if (selectedCount > 0) {
      setCurrentScreen('approve');
    }
  }

  function handleModificationSubmit(notes: string) {
    alert("Modification request submitted with notes: " + (notes || "No notes provided"));
    setCurrentScreen('dashboard');
    setSelectedApprovalId(null);
  }

  function handleBackToDashboard() {
    setCurrentScreen('dashboard');
  }

  // Render the appropriate screen based on currentScreen state
  if (currentScreen === 'requestModification' && selectedApproval) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="mb-4 sm:mb-5">
            <h2 className="text-[14px] font-semibold text-[#333] mb-1">Pending Approvals</h2>
            <p className="text-[12px] text-[#999]">Estimates awaiting customer confirmation</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {pendingApprovals.map(function(approval) {
              return (
                <PendingApprovalCard
                  key={approval.id}
                  vehicleNumber={approval.vehicleNumber}
                  vehicleModel={approval.vehicleModel}
                  customerName={approval.customerName}
                  timeAgo={approval.timeAgo}
                  isActive={selectedApprovalId === approval.id}
                  onClick={function() { handleCardClick(approval.id); }}
                />
              );
            })}
          </div>
        </div>
        <RequestModificationScreen
          approval={selectedApproval}
          selectedJobs={selectedJobs}
          total={total}
          onBack={handleBackToDashboard}
          onSubmit={handleModificationSubmit}
        />
      </div>
    );
  }

  if (currentScreen === 'approve' && selectedApproval) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="mb-4 sm:mb-5">
            <h2 className="text-[14px] font-semibold text-[#333] mb-1">Pending Approvals</h2>
            <p className="text-[12px] text-[#999]">Estimates awaiting customer confirmation</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {pendingApprovals.map(function(approval) {
              return (
                <PendingApprovalCard
                  key={approval.id}
                  vehicleNumber={approval.vehicleNumber}
                  vehicleModel={approval.vehicleModel}
                  customerName={approval.customerName}
                  timeAgo={approval.timeAgo}
                  isActive={selectedApprovalId === approval.id}
                  onClick={function() { handleCardClick(approval.id); }}
                />
              );
            })}
          </div>
        </div>
        <ApproveScreen
          selectedJobs={selectedJobs}
          total={total}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="mb-4 sm:mb-5">
          <h2 className="text-[14px] font-semibold text-[#333] mb-1">Pending Approvals</h2>
          <p className="text-[12px] text-[#999]">Estimates awaiting customer confirmation</p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {pendingApprovals.map(function(approval) {
            return (
              <PendingApprovalCard
                key={approval.id}
                vehicleNumber={approval.vehicleNumber}
                vehicleModel={approval.vehicleModel}
                customerName={approval.customerName}
                timeAgo={approval.timeAgo}
                isActive={selectedApprovalId === approval.id}
                onClick={function() { handleCardClick(approval.id); }}
              />
            );
          })}
        </div>
      </div>

      {selectedApproval && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div className="mb-3">
              <h2 className="text-[16px] font-semibold text-[#333] mb-1">Service Estimate</h2>
              <p className="text-[12px] text-[#999]">
                {selectedApproval.vehicleNumber} – {selectedApproval.vehicleModel}
              </p>
            </div>
            <div className="bg-[#ffe1b7] inline-block px-4 sm:px-6 py-2 rounded-[5px] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] mb-3 sm:mb-0">
              <p className="text-[14px] sm:text-[16px] font-semibold text-[#e89d00]">Pending Approval</p>
            </div>
          </div>

          <CustomerInfo
            customerName={selectedApproval.customerName}
            customerPhone={selectedApproval.customerPhone}
          />

          <div className="flex items-center gap-3 text-[12px] sm:text-[14px] text-[#999]">
            <Clock size={20} color="#999999" />
            <p>Estimate sent on: {selectedApproval.sentDate} at {selectedApproval.sentTime}</p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 sm:p-5">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#333] mb-6 sm:mb-8">Select jobs to approve:</h3>
            <div className="space-y-4 sm:space-y-8">
              {jobs.map(function(job) {
                return (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    description={job.description}
                    details={job.details}
                    price={"₹" + job.price.toLocaleString()}
                    isSelected={job.selected}
                    onToggle={function() { toggleJob(job.id); }}
                  />
                );
              })}
            </div>
          </div>

          <PricingSummary
            selectedCount={selectedCount}
            totalCount={jobs.length}
            subtotal={subtotal}
            gst={gst}
            total={total}
          />

          <ActionButtons
            selectedCount={selectedCount}
            total={total}
            onRequestModification={handleRequestModification}
            onApprove={handleApprove}
          />
        </>
      )}
    </div>
  );
}

export default CustomerApprovalDashboard;

