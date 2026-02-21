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
