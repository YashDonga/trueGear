import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-[14px] text-[#666] mb-5">
      <Home className="w-4 h-4" />
      <span>Home</span>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          <span className={index === items.length - 1 ? 'text-[#333]' : ''}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
