import { ChecklistItem } from './ChecklistItem.tsx';

interface InspectionSectionProps {
  title: string;
  description: string;
  progress: string;
  items: Array<{ label: string; description?: string }>;
}

export function InspectionSection({ title, description, progress, items }: InspectionSectionProps) {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-[10px] mb-5">
      {/* Section Header */}
      <div className="bg-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3.75 py-4 px-5 gap-2 sm:gap-0">
        <div>
          <h3 className="text-[#333] text-[16px] mb-0.5">{title}</h3>
          <p className="text-[#999] text-[12px]">{description}</p>
        </div>
        <div className="text-[#999] text-[14px] self-end sm:self-auto">{progress}</div>
      </div>

      {/* Checklist Items */}
      <div>
        {items.map((item, index) => (
          <ChecklistItem key={index} label={item.label} description={item.description} />
        ))}
      </div>
    </div>
  );
}
