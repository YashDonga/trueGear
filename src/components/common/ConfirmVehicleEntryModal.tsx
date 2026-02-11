import { CheckCircle } from 'lucide-react';
import Button from './Button';

interface ConfirmVehicleEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  registration: string;
  owner: string;
  photosCaptured: string;
  entryTime: string;
}

export function ConfirmVehicleEntryModal({
  isOpen,
  onClose,
  onConfirm,
  registration,
  owner,
  photosCaptured,
  entryTime
}: ConfirmVehicleEntryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-7.5 w-125 shadow-xl">
        {/* Title */}
        <h2 className="text-[#333] text-[20px] mb-2">Confirm Vehicle Entry</h2>
        <p className="text-[#999] text-[14px] mb-7.5">
          This will register the vehicle for service and notify the Quality check team.
        </p>

        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-7.5">
          <div>
            <p className="text-[#999] text-[12px] mb-1.25">Registration</p>
            <p className="text-[#333] text-[16px]">{registration}</p>
          </div>
          <div>
            <p className="text-[#999] text-[12px] mb-1.25">Owner</p>
            <p className="text-[#333] text-[16px]">{owner}</p>
          </div>
          <div>
            <p className="text-[#999] text-[12px] mb-1.25">Photos Captured</p>
            <p className="text-[#333] text-[16px]">{photosCaptured}</p>
          </div>
          <div>
            <p className="text-[#999] text-[12px] mb-1.25">Entry time</p>
            <p className="text-[#333] text-[16px]">{entryTime}</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-[#CACACA] my-6"></div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            onClick={onConfirm}
            icon={<CheckCircle className="w-5 h-5" />}
          >
            Confirm Entry!
          </Button>
        </div>
      </div>
    </div>
  );
}
