import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileCheckCorner } from "lucide-react";
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

const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmEntry = () => {
    setIsModalOpen(true);
  };

  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    {
      title: "Vehicle Registration No",
      required: true,
      capturedImage: numberplate,
    },
    { title: "Odometer Reading (KM)", required: true, capturedImage: odometer },
    { title: "Front View", required: false },
    { title: "Rear View", required: false },
    { title: "Left View", required: false },
    { title: "Right View", required: false },
    { title: "Dashboard View", required: false },
    { title: "Engine View", required: false },
  ]);

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
    // Navigate to success screen
    navigate(ROUTES.VEHICLE_ENTRY_SUCCESS);
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
        items={[{ label: "Security Guard" }, { label: "Vehicle Details" }]}
      />

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

              <p className="text-[#999] text-[12px]">
                Please capture at least {Math.max(0, 4 - capturedCount)} more
                photo{Math.max(0, 4 - capturedCount) !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Button */}
          <Button variant="gradient" icon={<CheckCircle className="w-5 h-5" />} onClick={handleConfirmEntry}>
            Confirm Entry!
          </Button>
        </div>
      </div>


      <ConfirmVehicleEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        registration="BL 00 MY ZN"
        owner="Ravi Varma"
        photosCaptured="08/08"
        entryTime="09:30 AM"
      />
    </>
  );
};

export default AddVehicle;
