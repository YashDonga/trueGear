import { ChecklistItem } from './ChecklistItem.tsx';

type ChecklistStatus = 'pass' | 'fail' | 'na' | null;

interface InspectionSectionProps {
  title: string;
  description: string;
  progress: string;
  items: Array<{ label: string; description?: string }>;
  status?: Record<number, ChecklistStatus>;
  onStatusChange?: (status: Record<number, ChecklistStatus>) => void;
}

export function InspectionSection({ title, description, progress, items, status = {}, onStatusChange }: InspectionSectionProps) {
  const handleStatusChange = (index: number, newStatus: ChecklistStatus) => {
    if (onStatusChange) {
      const updatedStatus = { ...status, [index]: newStatus };
      onStatusChange(updatedStatus);
    }
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[10px] mb-5">
      {/* Section Header */}
      <div className="bg-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3.75 py-4 px-5 gap-2 sm:gap-0 rounded-tr-[10px] rounded-tl-[10px]">
        <div>
          <h3 className="text-[#333] text-[16px] mb-0.5">{title}</h3>
          <p className="text-[#999] text-[12px]">{description}</p>
        </div>
        <div className="text-[#999] text-[14px] self-end sm:self-auto">{progress}</div>
      </div>

      {/* Checklist Items */}
      <div>
        {items.map((item, index) => (
          <ChecklistItem 
            key={`${title}-${index}`}
            label={item.label} 
            description={item.description}
            status={status[index]}
            onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}
