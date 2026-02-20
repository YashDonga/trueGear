interface PricingSummaryProps {
  selectedCount: number;
  totalCount: number;
  subtotal: number;
  gst: number;
  total: number;
}

export function PricingSummary({ selectedCount, totalCount, subtotal, gst, total }: PricingSummaryProps) {
  return (
    <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-5">
      <div className="flex flex-col gap-6">
        {/* Selected Jobs */}
        <div className="flex items-center justify-between text-[16px]">
          <p className="text-[#999]">Selected Jobs</p>
          <p className="font-semibold text-[#333]">{selectedCount} of {totalCount}</p>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between text-[16px]">
          <p className="text-[#999]">Subtotal</p>
          <p className="font-semibold text-[#333]">₹ {subtotal.toLocaleString()}</p>
        </div>

        {/* GST */}
        <div className="flex items-center justify-between text-[16px]">
          <p className="text-[#999]">GST (18%)</p>
          <p className="font-semibold text-[#333]">₹ {gst.toLocaleString()}</p>
        </div>

        {/* Total Estimate */}
        <div className="border-t border-[#e5e7eb] pt-2.5">
          <div className="flex items-center justify-between text-[20px] font-semibold text-[#333]">
            <p>Total Estimate</p>
            <p>₹ {total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
