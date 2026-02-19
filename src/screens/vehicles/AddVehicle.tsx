import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileCheckCorner, User, Car, ArrowLeft } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { PhotoCaptureCard } from "../../components/cards/PhotoCaptureCard";

import numberplate from "../../assets/numberplate.png";
import odometer from "../../assets/odometer.jpg";
import { ConfirmVehicleEntryModal } from "../../components/common/ConfirmVehicleEntryModal";
import { ROUTES } from "../../constants/routes";

interface PhotoSlot {
  title: string;
  required: boolean;
  capturedImage?: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  vehicleNumber: string;
  vehicleMake: string;
  vehicleModel: string;
}

const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load customer data from sessionStorage on mount
  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customerData");
    const storedIsEditing = sessionStorage.getItem("isEditing");
    
    if (storedCustomer) {
      try {
        setCustomerData(JSON.parse(storedCustomer));
      } catch (e) {
        console.error("Error parsing customer data:", e);
      }
    }
    
    // Check if we're in editing mode
    if (storedIsEditing === "true") {
      setIsEditing(true);
    }
  }, []);

  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    {
      title: "Vehicle Registration No",
      required: true,
      capturedImage: numberplate,
    },
    { title: "Odometer Reading (KM)", required: true, capturedImage: odometer },
    { title: "Front View", required: true },
    { title: "Rear View", required: false },
    { title: "Left View", required: false },
    { title: "Right View", required: false },
    { title: "Dashboard View", required: false },
    { title: "Engine View", required: false },
  ]);

  // Check if all required fields are captured
  const requiredSlots = photoSlots.filter(slot => slot.required);
  const capturedRequiredCount = requiredSlots.filter(slot => slot.capturedImage).length;
  const isValid = capturedRequiredCount === requiredSlots.length;
  const missingCount = requiredSlots.length - capturedRequiredCount;

  const handleConfirmEntry = () => {
    if (!isValid) {
      setValidationError(`Please capture ${missingCount} more required photo${missingCount !== 1 ? 's' : ''} before confirming entry.`);
      return;
    }
    setValidationError("");
    setIsModalOpen(true);
  };

  const capturedCount = photoSlots.filter((slot) => slot.capturedImage).length;

  // Handle capture button click - opens file picker
  const handleCapture = (index: number) => {
    setActiveSlot(index);
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeSlot !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoSlots((prev) => {
          const updated = [...prev];
          updated[activeSlot] = {
            ...updated[activeSlot],
            capturedImage: reader.result as string,
          };
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset file input
    event.target.value = "";
    setActiveSlot(null);
  };

  // Handle delete button click
  const handleDelete = (index: number) => {
    setPhotoSlots((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        capturedImage: undefined,
      };
      return updated;
    });
  };


  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // Clear customer data from session after successful entry
    sessionStorage.removeItem("customerData");
    sessionStorage.removeItem("isEditing");
    // Navigate to success screen or back to dashboard
    if (isEditing) {
      navigate(ROUTES.SECURITY_DASHBOARD);
    } else {
      navigate(ROUTES.VEHICLE_ENTRY_SUCCESS);
    }
  };

  const handleBack = () => {
    // Navigate back based on mode
    if (isEditing) {
      navigate(ROUTES.SECURITY_DASHBOARD);
    } else {
      navigate(ROUTES.ADD_CUSTOMER);
    }
  };

  return (
    <>
      {/* Hidden file input for camera capture */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Security Guard", onClick: () => navigate(ROUTES.SECURITY_DASHBOARD) }, 
          isEditing 
            ? { label: "Edit Vehicle" }
            : { label: "Customer Details", onClick: handleBack },
          { label: "Vehicle Photos" }
        ]}
      />

      {/* Customer Info Card */}
      {customerData && (
        <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#333] text-[14px] sm:text-[15px] font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-[#ff4f31]" />
              Customer Information
            </h3>
            <button 
              onClick={handleBack}
              className="text-[#0066FF] text-[13px] flex items-center gap-1 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Customer Name */}
            <div className="bg-[#f9f9f9] rounded-[8px] p-3">
              <p className="text-[#999] text-[11px] mb-1">Customer Name</p>
              <p className="text-[#333] text-[14px] font-medium">
                {customerData.firstName} {customerData.lastName}
              </p>
            </div>
            
            {/* Phone Number */}
            <div className="bg-[#f9f9f9] rounded-[8px] p-3">
              <p className="text-[#999] text-[11px] mb-1">Phone Number</p>
              <p className="text-[#333] text-[14px] font-medium">
                {customerData.phoneNumber}
              </p>
            </div>
            
            {/* Email */}
            <div className="bg-[#f9f9f9] rounded-[8px] p-3">
              <p className="text-[#999] text-[11px] mb-1">Email</p>
              <p className="text-[#333] text-[14px] font-medium">
                {customerData.email || "N/A"}
              </p>
            </div>
            
            {/* Vehicle Number */}
            <div className="bg-[#f9f9f9] rounded-[8px] p-3">
              <p className="text-[#999] text-[11px] mb-1">Vehicle Number</p>
              <p className="text-[#333] text-[14px] font-medium uppercase">
                {customerData.vehicleNumber}
              </p>
            </div>
            
            {/* Vehicle Make & Model */}
            <div className="bg-[#f9f9f9] rounded-[8px] p-3 sm:col-span-2">
              <p className="text-[#999] text-[11px] mb-1">Vehicle</p>
              <p className="text-[#333] text-[14px] font-medium flex items-center gap-2">
                <Car className="w-4 h-4 text-[#666]" />
                {customerData.vehicleMake} {customerData.vehicleModel}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Photo Section */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
        <div className="mb-6 sm:mb-7">
          <h2 className="text-[#333] text-[15px] sm:text-[16px] mb-1">
            Vehicle Photo Capture ({capturedCount}/8)
          </h2>
          <p className="text-[#999] text-[12px]">
            Capture photos from all angles. At least 4 photos required.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {photoSlots.map((slot, index) => (
            <PhotoCaptureCard
              key={index}
              title={slot.title}
              required={slot.required}
              capturedImage={slot.capturedImage}
              onCapture={() => handleCapture(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      </div>

      {/* Entry Notes */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
        <div>
          <h3 className="text-[#333] text-[15px] sm:text-[16px] mb-2">
            Entry Notes
          </h3>

          <p className="text-[#999] text-[12px] mb-3">
            Add any observations about the vehicle condition
          </p>

          <textarea
            placeholder="e.g., Minor scratch on left door, customer mentioned AC not cooling properly..."
            className="w-full h-28 sm:h-32 border border-[#e5e7eb] rounded-[10px] p-3 sm:p-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] resize-none outline-none focus:border-[#04c397]"
          />
        </div>
      </div>

      {/* Confirmation Section */}
      <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
        {/* Validation Error Message */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[10px]">
            <p className="text-red-600 text-[13px]">{validationError}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-[#e5e7eb] rounded-[10px] p-4 sm:p-5">
          
          {/* Left Content */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex justify-center items-center bg-[#3aa400] h-10 w-10 rounded-full p-2 shrink-0">
                <FileCheckCorner size={20} color="#fff"/>
            </div>

            <div>
              <p className="text-[#333] text-[14px] sm:text-[16px]">
                Ready to confirm entry?
              </p>

              <p className={`text-[12px] ${!isValid ? 'text-orange-600' : 'text-[#999]'}`}>
                {!isValid 
                  ? `${missingCount} required photo${missingCount !== 1 ? 's' : ''} missing`
                  : `Please capture at least ${Math.max(0, 4 - capturedCount)} more photo${Math.max(0, 4 - capturedCount) !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>

          {/* Button */}
          <Button 
            variant="gradient" 
            icon={<CheckCircle className="w-5 h-5" />} 
            onClick={handleConfirmEntry}
            disabled={!isValid}
          >
            {isEditing ? "Update Entry" : "Confirm Entry!"}
          </Button>
        </div>
      </div>


      <ConfirmVehicleEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        registration={customerData?.vehicleNumber || "BL 00 MY ZN"}
        owner={customerData ? `${customerData.firstName} ${customerData.lastName}` : "Ravi Varma"}
        photosCaptured={`${capturedCount}/8`}
        entryTime="09:30 AM"
      />
    </>
  );
};

export default AddVehicle;
