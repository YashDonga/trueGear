import { useState } from "react";
import truckImg from "../../assets/truck.png";
import {
  ArrowLeft,
  Plus,
  Save,
  Share2,
  Trash2,
} from "lucide-react";

interface Job {
  id: number;
  jobDescription: string;
  partsRequired: string;
  partsCost: number;
  labourCost: number;
  quantity: number;
}

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

const CreateJobCard: React.FC = () => {
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

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-8 w-full pb-8">
        {/* Header Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-700">
            <ArrowLeft size={16} />
            <span className="text-xs">Back to Service Advisor</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Create Job Card
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Add service and parts for the estimate
            </p>
          </div>
        </div>

        {/* Vehicle Summary Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden shrink-0">
              <img
                src={truckImg}
                alt="Vehicle"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                BL 00 MY ZN
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Toyota innova Crysta - Vikram Mehta
              </p>
            </div>
          </div>
          <div className="bg-[#ffe1b7] text-[#e89d00] px-4 py-1.5 rounded-md text-sm font-semibold border border-white shadow-sm whitespace-nowrap">
            Job Card Draft
          </div>
        </div>

        {/* Suggested Jobs Chips */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm">
          <div className="mb-4 md:mb-6">
            <h3 className="text-base font-semibold text-gray-800">
              Suggested Jobs (Based on QC Report)
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Click to add to job card
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {suggestedJobs.map((job) => (
              <button
                key={job}
                onClick={() => addSuggestedJob(job)}
                className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} className="text-gray-800" />
                <span className="text-sm md:text-base font-medium text-gray-800">
                  {job}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Job Rows Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Job Details
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Add jobs and their costs
              </p>
            </div>
            <button 
              onClick={addJob}
              className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
            >
              <Plus size={16} className="text-gray-800" />
              <span className="text-sm md:text-base font-medium text-gray-800">
                Add Row
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {jobs.map((job, index) => (
              <div key={job.id} className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-base font-medium text-gray-400">
                    Job #{index + 1}
                  </span>
                  <button 
                    onClick={() => removeJob(job.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Job Description and Parts Required - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Job Description
                    </label>
                    <input
                      type="text"
                      value={job.jobDescription}
                      onChange={(e) => updateJob(job.id, "jobDescription", e.target.value)}
                      placeholder="Enter job description"
                      className="w-full h-10 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-medium"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Parts Required
                    </label>
                    <input
                      type="text"
                      value={job.partsRequired}
                      onChange={(e) => updateJob(job.id, "partsRequired", e.target.value)}
                      placeholder="Enter parts required"
                      className="w-full h-10 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-medium"
                    />
                  </div>
                </div>

                {/* Cost Fields - Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Parts Cost
                    </label>
                    <input
                      type="number"
                      value={job.partsCost}
                      onChange={(e) => updateJob(job.id, "partsCost", Number(e.target.value))}
                      placeholder="0"
                      className="w-full h-10 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-semibold"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Labour Cost
                    </label>
                    <input
                      type="number"
                      value={job.labourCost}
                      onChange={(e) => updateJob(job.id, "labourCost", Number(e.target.value))}
                      placeholder="0"
                      className="w-full h-10 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-semibold"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={job.quantity}
                      onChange={(e) => updateJob(job.id, "quantity", Number(e.target.value))}
                      min="1"
                      className="w-full h-10 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-semibold"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-medium text-gray-400 mb-2 md:mb-3">
                      Line Total
                    </label>
                    <div className="w-full h-10 px-4 md:px-5 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-sm md:text-base font-semibold flex items-center">
                      ₹ {calculateLineTotal(job).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Section - Grid Layout */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col items-end gap-4 md:gap-6 shadow-sm">
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg flex justify-between items-center text-sm md:text-base">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-semibold text-gray-800">₹ {subtotal.toLocaleString()}</span>
          </div>
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg flex justify-between items-center text-sm md:text-base">
            <span className="text-gray-400">GST (18%)</span>
            <span className="font-semibold text-gray-800">₹ {gst.toLocaleString()}</span>
          </div>
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg border-t border-gray-200 pt-3 flex justify-between items-center text-lg md:text-xl text-gray-800 font-semibold">
            <span>Total Estimate</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer Actions - Grid Layout */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Ready to share estimate?
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {jobs.length} job(s) - Total: ₹{total.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
              <Save size={20} className="text-gray-800" />
              <span className="text-sm md:text-base font-medium text-gray-800">
                Save Draft
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-linear-to-b from-[#ff4f31] to-[#fe2b73] rounded-[10px] text-white hover:opacity-90 transition-opacity shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]">
              <Share2 size={20} className="text-white" />
              <span className="text-sm md:text-base font-medium">
                Share Estimate with Customer
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJobCard;

