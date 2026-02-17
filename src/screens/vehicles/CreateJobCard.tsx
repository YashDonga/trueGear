import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobCardActions } from "../../components/cards/JobCardActions";
import { JobCardHeader } from "../../components/cards/JobCardHeader";
import { JobDetails, type Job } from "../../components/cards/JobDetails";
import { SuggestedJobsChips } from "../../components/cards/SuggestedJobsChips";
import { TotalsSummary } from "../../components/cards/TotalsSummary";
import { VehicleSummaryCard } from "../../components/cards/VehicleSummaryCard";

const initialJobs: Job[] = [
  {
    id: 1,
    jobDescription: "AC Gas Refill & Cooling Check",
    partsRequired: "Refrigerant Gas R134a",
    partsCost: 1500,
    labourCost: 500,
    quantity: 1,
  },
  {
    id: 2,
    jobDescription: "AC Compressor Inspection",
    partsRequired: "Compressor Seal kit",
    partsCost: 800,
    labourCost: 1200,
    quantity: 1,
  },
];

const suggestedJobs = [
  "AC Gas Refill",
  "AC Compressor Check",
  "Oil Filter Replacement",
  "Brake fluid Top-up",
  "Front Tyre Replacement",
];

// Mock vehicle data - in real app this would come from props or API
const mockVehicleData = {
  registration: "BL 00 MY ZN",
  model: "Toyota innova Crysta",
  customerName: "Vikram Mehta",
};

const CreateJobCard: React.FC = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = () => {
    const newJob: Job = {
      id: Date.now(),
      jobDescription: "",
      partsRequired: "",
      partsCost: 0,
      labourCost: 0,
      quantity: 1,
    };
    setJobs([...jobs, newJob]);
  };

  const removeJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const updateJob = (id: number, field: keyof Job, value: string | number) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, [field]: value } : job
      )
    );
  };

  const addSuggestedJob = (jobName: string) => {
    const newJob: Job = {
      id: Date.now(),
      jobDescription: jobName,
      partsRequired: "",
      partsCost: 0,
      labourCost: 0,
      quantity: 1,
    };
    setJobs([...jobs, newJob]);
  };

  const calculateLineTotal = (job: Job) => {
    return (job.partsCost + job.labourCost) * job.quantity;
  };

  const subtotal = jobs.reduce((sum, job) => sum + calculateLineTotal(job), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleBackClick = () => {
    navigate(-1)
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log("Save draft clicked");
  };

  const handleShareEstimate = () => {
    // TODO: Implement share estimate functionality
    console.log("Share estimate clicked");
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-8 w-full pb-8">
        {/* Header Section */}
        <JobCardHeader onBackClick={handleBackClick} />

        {/* Vehicle Summary Card */}
        <VehicleSummaryCard
          registration={mockVehicleData.registration}
          model={mockVehicleData.model}
          customerName={mockVehicleData.customerName}
        />

        {/* Suggested Jobs Chips */}
        <SuggestedJobsChips
          suggestedJobs={suggestedJobs}
          onJobClick={addSuggestedJob}
        />

        {/* Job Rows Section */}
        <JobDetails
          jobs={jobs}
          onAddJob={addJob}
          onUpdateJob={updateJob}
          onRemoveJob={removeJob}
          calculateLineTotal={calculateLineTotal}
        />

        {/* Totals Section */}
        <TotalsSummary
          subtotal={subtotal}
          gst={gst}
          total={total}
        />

        {/* Footer Actions */}
        <JobCardActions
          jobCount={jobs.length}
          total={total}
          onSaveDraft={handleSaveDraft}
          onShareEstimate={handleShareEstimate}
        />
      </div>
    </>
  );
};

export default CreateJobCard;

