import { StickyNote } from 'lucide-react';
import { useState } from 'react';

interface ChecklistItemProps {
  label: string;
  description?: string;
}

type Status = 'pass' | 'fail' | 'na' | null;

export function ChecklistItem({ label, description }: ChecklistItemProps) {
  const [status, setStatus] = useState<Status>(null);

  return (
    <div className="flex items-center justify-between py-3.75 px-5 border-b border-[#ebebeb] last:border-0">
      <div className="flex-1">
        <p className="text-[#333] text-[14px] mb-0.5">{label}</p>
        {description && <p className="text-[#999] text-[12px]">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Status Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatus('pass')}
            className={`px-4 h-8 rounded-md text-[14px] font-medium transition-colors ${
              status === 'pass'
                ? 'bg-[#3aa400] text-white'
                : 'bg-white border border-[#e5e7eb] text-[#333] hover:bg-gray-50'
            }`}
          >
            Pass
          </button>
          <button
            onClick={() => setStatus('fail')}
            className={`px-4 h-8 rounded-md text-[14px] font-medium transition-colors ${
              status === 'fail'
                ? 'bg-[#ff0000] text-white'
                : 'bg-white border border-[#e5e7eb] text-[#333] hover:bg-gray-50'
            }`}
          >
            Fail
          </button>
          <button
            onClick={() => setStatus('na')}
            className={`px-4 h-8 rounded-md text-[14px] font-medium transition-colors ${
              status === 'na'
                ? 'bg-[#999] text-white'
                : 'bg-white border border-[#e5e7eb] text-[#333] hover:bg-gray-50'
            }`}
          >
            N/A
          </button>
        </div>

        {/* Camera Icon */}
        <button className="w-8 h-8 rounded-md border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50">
          <StickyNote size={24} color="#CACACA" />
        </button>
      </div>
    </div>
  );
}
