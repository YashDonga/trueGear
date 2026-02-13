import { useState } from "react";

interface RatingButtonsProps {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function RatingButtons({
  options,
  defaultValue,
  onChange,
}: RatingButtonsProps) {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-3  px-5">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`px-8 h-12.5 rounded-[10px] text-[14px] font-medium transition-all ${
            selected === option
              ? "bg-linear-to-r from-[#7CE000] to-[#03A800] text-white shadow-[2px_4px_8px_0px_rgba(58,164,0,0.3)]"
              : "bg-white border border-[#e5e7eb] text-[#333] hover:bg-gray-50"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
