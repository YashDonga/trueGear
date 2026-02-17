import { StickyNote } from 'lucide-react';
import { useState } from 'react';
import Button from '../common/Button';

interface ChecklistItemProps {
  label: string;
  description?: string;
}

type Status = 'pass' | 'fail' | 'na' | null;

export function ChecklistItem({ label, description }: ChecklistItemProps) {
  const [status, setStatus] = useState<Status>(null);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3.75 px-5 border-b border-[#ebebeb] last:border-0 gap-3 sm:gap-0">
      <div className="flex-1 w-full sm:w-auto">
        <p className="text-[#333] text-[14px] mb-0.5">{label}</p>
        {description && <p className="text-[#999] text-[12px]">{description}</p>}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Status Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#EFEFEF] p-1.25 border border-[#DBDBDB] rounded-[10px]">
          <Button
            variant="custom"
            onClick={() => setStatus('pass')}
            className={`px-2 sm:px-4 h-9.5! rounded-md text-[12px] sm:text-[14px] font-medium transition-colors ${
              status === 'pass'
                ? 'bg-linear-to-r from-[#7CE000] to-[#03A800] text-white border border-[#EBEBEB] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]'
                : 'bg-transparent text-[#333] hover:bg-gray-100'
            }`}
          >
            Pass
          </Button>
          <Button
            variant="custom"
            onClick={() => setStatus('fail')}
            className={`px-2 sm:px-4 h-9.5! rounded-md text-[12px] sm:text-[14px] font-medium transition-colors ${
              status === 'fail'
                ? 'bg-linear-to-r from-[#FF0000] to-[#E50000] text-white border border-[#EBEBEB] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]'
                : 'bg-transparent text-[#333] hover:bg-gray-100'
            }`}
          >
            Fail
          </Button>
          <Button
            variant="custom"
            onClick={() => setStatus('na')}
            className={`px-2 sm:px-4 h-9.5! rounded-md text-[12px] sm:text-[14px] font-medium transition-colors ${
              status === 'na'
                ? 'bg-linear-to-r from-[#C1C1C1] to-[#B1B1B1] text-white border border-[#EBEBEB] shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]'
                : 'bg-transparent text-[#333] hover:bg-gray-100'
            }`}
          >
            N/A
          </Button>
        </div>

        {/* Camera Icon */}
        <Button
          variant="custom"
          className="h-12.5! rounded-md bg-[#FBFBFB] border border-[#BFBFBF] flex items-center justify-center hover:bg-gray-50 shrink-0 px-3!"
        >
          <StickyNote size={20} color="#CACACA" />
        </Button>
      </div>
    </div>
  );
}

