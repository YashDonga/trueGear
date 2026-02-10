import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 px-3 sm:px-5">

      {/* Showing Text */}
      <p className="text-[#666] text-xs sm:text-sm text-center sm:text-left">
        Showing 1 - 10 of 60
      </p>

      {/* ===== Desktop / Tablet Pagination ===== */}
      <div className="hidden sm:flex items-center gap-2">

        {/* Prev */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <ChevronLeft className="w-5 h-5 text-[#666]" />
        </button>

        {/* Pages */}
        <button className="bg-linear-to-b from-[#ff4f31] to-[#fe2b73] text-white w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm">
          1
        </button>

        {[2, 3, 4].map((page) => (
          <button
            key={page}
            className="bg-white border border-[#e5e7eb] text-[#333] w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm"
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <ChevronRight className="w-5 h-5 text-[#666]" />
        </button>
      </div>

      {/* ===== Mobile Pagination ===== */}
      <div className="flex sm:hidden items-center justify-between gap-2">

        <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm">
          <ChevronLeft size={16} />
          Prev
        </button>

        <span className="text-sm font-medium text-[#333]">
          Page 1 of 6
        </span>

        <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm">
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
