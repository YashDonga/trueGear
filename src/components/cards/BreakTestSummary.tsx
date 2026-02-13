import { cn } from "../utils/cn";

interface BreakTestSummarySectionProps {
  title: string;
  description: string;
}

export function BreakTestSummary({ title, description }: BreakTestSummarySectionProps) {
  const items = [
    { label: 'Performance', value: 'Average', color: 'text-orange-400' },
    { label: 'Noise', value: 'None', color: 'text-green-500' },
    { label: 'Vibration', value: 'None', color: 'text-green-500' },
  ];
  return (
    <div className="bg-white border border-[#ebebeb] rounded-[10px] mb-4 sm:mb-5">
      {/* Section Header */}
      <div className="bg-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 px-4 sm:px-5 gap-2 sm:gap-0 rounded-tr-[10px] rounded-tl-[10px]">
        <div>
          <h3 className="text-[#333] text-sm sm:text-[16px] mb-0.5">{title}</h3>
          <p className="text-[#999] text-xs sm:text-[12px]">{description}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 border-t-0 p-4 sm:p-6 rounded-b-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center h-28 sm:h-32">
              <span className="text-xs font-medium text-gray-400 mb-1 sm:mb-2">{item.label}</span>
              <span className={cn("text-lg sm:text-xl font-bold", item.color)}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
