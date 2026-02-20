import { useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import imgPlan from "../../assets/plan.png";


interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <>
    {/* Label Box */}
    <div className="flex h-10 w-full items-center justify-center rounded-[5px] border border-[#e5e7eb] bg-white px-5 py-2.5">
      <span className="font-['Poppins'] text-[16px] font-medium leading-[1.2] text-[#333] whitespace-nowrap">
        {label}
      </span>
    </div>

    {/* Value Box */}
    <div className="flex h-10 w-full items-center justify-center rounded-[5px] border border-[#e5e7eb] bg-white px-5 py-2.5">
      <span className="font-['Poppins'] text-[16px] font-medium leading-[1.2] text-[#333] whitespace-nowrap text-center">
        {value}
      </span>
    </div>
  </>
);

export const SendEstimate = () => {
  const [isEstimateSent, setIsEstimateSent] = useState(false);
  const navigate = useNavigate();

  const handleSendEstimate = () => {
    setIsEstimateSent(true);
  };

  if (isEstimateSent) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 font-['Poppins']">
      
      {/* Icon Section */}
      <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-full border border-[#bfbfbf] bg-[#fbfbfb]">
        <img
        src={imgPlan}
        alt="Plan Icon"
      />
      </div>

      {/* Text Section */}
      <div className="mb-10 flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-[24px] font-semibold leading-[1.2] text-[#333]">
          Estimate Sent
        </h1>
        <p className="max-w-150 text-[18px] leading-[1.3] text-[#999]">
          The estimate has been sent to Vikram Mehta at +91 98765 43210.<br className="hidden md:block" />
          You will be notified once the customer approves.
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-6 flex h-12.5 w-full max-w-83.5 items-center justify-center rounded-[10px] bg-linear-to-b from-[#ff4f31] to-[#fe2b73] px-4 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]">
        <span className="font-['Poppins'] text-[16px] font-medium leading-[1.2] text-white whitespace-nowrap">
          Status: Awaiting Customer Approval
        </span>
      </div>

      {/* Action Button */}
      <Button 
        variant="outline" 
        className="w-full max-w-83.5 rounded-[5px] h-12.5 bg-white hover:bg-gray-50 border-[#e5e7eb]"
        onClick={() => navigate('/service-advisor-dashboard')}
      >
        Back to Service Advisor
      </Button>
    </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-8 font-['Poppins']">
      
      {/* Header Section */}
      <div className="flex w-full flex-col items-center gap-1.5 text-center mb-8 md:mb-10">
        <h1 className="text-lg md:text-xl font-semibold leading-[1.2] text-[#333]">
          Send an estimate to customer
        </h1>
        <p className="max-w-70 md:max-w-md text-xs md:text-sm leading-[1.2] text-[#999]">
          This will send the job estimate to the customer for approval via SMS and WhatsApp.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-8 md:gap-x-36 mb-8 md:mb-10 w-full max-w-md md:max-w-150">
        <DetailRow label="Customer:" value="Vikram Mehta" />
        <DetailRow label="Phone:" value="+91 98765 43210" />
        <DetailRow label="Total Jobs" value="2" />
        <DetailRow label="Estimate Total:" value="₹4,720" />
      </div>

      {/* Action Buttons */}
      <div className="flex w-full flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
        {/* Cancel button has 5px rounded corners in Figma */}
        <Button variant="outline" className="w-full md:w-44 rounded-[5px]">
          Cancel
        </Button>
        {/* Send Estimate button has 10px rounded corners in Figma */}
        <Button 
          variant="gradient" 
          className="w-full md:w-48 rounded-[10px]"
          onClick={handleSendEstimate}
        >
          Send Estimate
        </Button>
      </div>
    </div>
  );
};

