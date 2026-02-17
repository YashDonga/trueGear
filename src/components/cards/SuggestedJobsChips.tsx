import { Plus } from "lucide-react";
import Button from "../common/Button";

interface SuggestedJobsChipsProps {
  suggestedJobs: string[];
  onJobClick: (jobName: string) => void;
}

export function SuggestedJobsChips({ suggestedJobs, onJobClick }: SuggestedJobsChipsProps) {
  return (
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
          <Button
            key={job}
            variant="custom"
            customStyles={{
              background: "white",
              border: "#e5e7eb",
              text: "#1f2937",
              hoverBg: "#f9fafb",
            }}
            onClick={() => onJobClick(job)}
            icon={<Plus size={16} className="text-gray-800" />}
            className="px-3 md:px-5 py-2 md:py-2.5 rounded-md"
          >
            <span className="text-sm md:text-base font-medium text-gray-800">
              {job}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export type { SuggestedJobsChipsProps };

