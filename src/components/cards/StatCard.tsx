

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-[18px_20px] shadow-[2px_3px_20px_0px_rgba(0,0,0,0.04)] h-30 flex flex-col justify-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.25">
            <p className="text-[#999] text-[14px]">{title}</p>
            <p className="text-[#333] text-[32px]">{value}</p>
          </div>
          <p className="text-[12px]">
            <span className="text-[#3aa400]">{change}</span>{' '}
            <span className="text-[#999] font-light">vs yesterday</span>
          </p>
        </div>
        {icon && (
          <div className="bg-[#fbfbfb] border border-[#bfbfbf] rounded-[10px] p-3.25 opacity-60 w-12.5 h-12.5 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
