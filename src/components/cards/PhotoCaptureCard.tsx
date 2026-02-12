import { Camera, Image, Trash2 } from "lucide-react";
import Button from '../common/Button';

interface PhotoCaptureCardProps {
  title: string;
  required?: boolean;
  capturedImage?: string;
  onCapture?: () => void;
  onDelete?: () => void;
}

export function PhotoCaptureCard({
  title,
  required = false,
  capturedImage,
  onCapture,
  onDelete,
}: PhotoCaptureCardProps) {
  return (
    <div className="bg-[#eff1f5] rounded-[10px] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 items-center w-full sm:w-65 md:w-67.5">
      {/* Title */}
      <p className="text-[14px] sm:text-[16px] text-[#333] text-center">
        {title}
        {required && <span className="text-[#f51111] ml-1">*</span>}
      </p>

      {/* Capture Container */}
      <div
        className="relative bg-white border-2 border-dashed border-[#8c8c8c] rounded-[10px] w-full h-45 sm:h-41.25 md:h-42.5 flex flex-col items-center justify-center gap-3 px-4 sm:px-6 py-4 overflow-hidden">
        {capturedImage ? (
          <>
            {/* Captured Image */}
            <img
              src={capturedImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-[10px]"
            />

            {/* Delete Button */}
            <button
              onClick={onDelete}
              className="absolute top-2 right-2 bg-white rounded-md p-2 shadow-md hover:bg-gray-100 z-10"
            >
              <Trash2 className="w-4 h-4 text-[#DE2020]" />
            </button>
          </>
        ) : (
          <>
          <Image size={64} strokeWidth={3} absoluteStrokeWidth />
            {/* Capture Button */}
            <Button
              onClick={onCapture}
              variant="gradient"
              gradient={{ from: '#04C397', to: '#158E86', direction: 'to-r' }}
              icon={<Camera className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />}
              className="w-full sm:w-32.5 h-11 sm:h-12.5"
            >
              Capture
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
