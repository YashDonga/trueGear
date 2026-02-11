import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";

interface VehicleLookupProps {
  onSearch?: (query: string) => void;
  onAddVehicle?: () => void;
}

export function VehicleLookup({ onSearch, onAddVehicle }: VehicleLookupProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

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

          <Input
            type="text"
            placeholder="Enter Registration Number (e.g., KA-01-AB-1234)"
            className="flex-1 text-[13px] sm:text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <Button 
          variant="gradient"
          onClick={handleSearch}
        >
          Search
        </Button>

        {/* Add Vehicle Button */}
        <Button 
          variant="secondary"
          onClick={onAddVehicle}
          icon={<Plus className="w-5 h-5" />}
        >
          Add New Vehicle
        </Button>
      </div>
    </div>
  );
}

