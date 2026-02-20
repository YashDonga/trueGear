import { CircleUser, EllipsisVertical, Mail, Pen, Phone } from "lucide-react";
import Button from "../common/Button";

interface ProfileHeaderProps {
  companyName: string;
  customerId: string;
  accountNumber: string;
  address1: string;
  phone1: string;
  onEditClick?: () => void;
}

export function CustomerProfile({
  companyName,
  customerId,
  accountNumber,
  address1,
  phone1,
  onEditClick,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-5">
      <div className="flex items-start justify-between">
        {/* Left Side - Company Info */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden shadow-[0px_2px_4px_0px_#0000001A] flex items-center justify-center">
            <CircleUser color="#fff" size={30} />
          </div>

          {/* Company Details */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[16px] font-semibold text-[#333]">
              {companyName}
            </h2>
            <div className="flex items-center gap-4 text-[12px] text-[#999]">
              <p>{customerId}</p>
              <span>•</span>
              <p>{accountNumber}</p>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-[#999] mt-1">
              <div className="flex items-center gap-2">
                <Mail size={16} color="#8C8C8C" />
                <p>{address1}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} color="#8C8C8C" />
                <p>{phone1}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-[#e8f5e9] px-3 py-1 rounded-[4px] text-[12px] font-medium text-[#2e7d32]">
                Fleet/Commercial
              </span>
              <span className="bg-[#fff3e0] px-3 py-1 rounded-[4px] text-[12px] font-medium text-[#f57c00]">
                Gold Member
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Right Side - Edit Button */}
        <button
          className="bg-[#FF4F31] flex items-center gap-2 px-6 py-2 rounded-[10px] text-white hover:bg-[#e64528] transition-colors cursor-pointer"
          onClick={onEditClick}
        >
          <Pen color="#fff" size={24} />
          <span className="text-[14px] font-medium">Edit Profile</span>
        </button>
        <Button
          variant="custom"
          className="p-3.25! hover:bg-gray-100 bg-[#FBFBFB] border border-[#EBEBEB] rounded-md"
        >
          <EllipsisVertical size={24} />
        </Button>
        </div>
      </div>
    </div>
  );
}
