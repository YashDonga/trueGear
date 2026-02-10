import { Search, Plus } from "lucide-react";

export function VehicleLookup() {
  return (
    <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6">
      
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-[#333] text-[15px] sm:text-[16px] mb-1">
          Vehicle Lookup
        </h2>
        <p className="text-[#999] text-[12px] sm:text-[13px]">
          Enter the vehicle registration number to search
        </p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col md:flex-row gap-3">
        
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 bg-white border border-[#bfbfbf] rounded-[10px] px-4 sm:px-5 h-12 sm:h-12.5">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#999]" />

          <input
            type="text"
            placeholder="Enter Registration Number (e.g., KA-01-AB-1234)"
            className="flex-1 text-[13px] sm:text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none bg-transparent"
          />
        </div>

        {/* Search Button */}
        <button className="w-full md:w-auto bg-linear-to-b from-[#ff4f31] to-[#fe2b73] text-white px-6 sm:px-8 h-12 sm:h-12.5 rounded-[10px] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] hover:opacity-90">
          Search
        </button>

        {/* Add Vehicle Button */}
        <button className="w-full md:w-auto bg-[#0066FF] text-white px-5 sm:px-6 h-12 sm:h-12.5 rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#0052cc]">
          <Plus className="w-5 h-5" />
          Add New Vehicle
        </button>
      </div>
    </div>
  );
}
