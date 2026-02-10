import { Car, Truck, Users, Menu, X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function Sidebar({ open, setOpen }: Props) {
  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static z-50
          top-0 left-0
          h-screen
          w-22.5 sm:w-25 lg:w-27.5
          bg-white border-r border-[#ebebeb]
          flex flex-col items-center pt-5 gap-5
          transform transition-transform duration-300
          
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <button
          className={`lg:hidden absolute top-4 ${
            open ? "-right-6" : "right-0"
          } bg-white rounded-lg p-2 shadow`}
          onClick={() => setOpen(false)}
        >
          <X />
        </button>

        {!open && (
          <>
            {/* Menu Button */}
            <button className="bg-[#fbfbfb] border border-[#ebebeb] rounded-[10px] p-3 w-12.5 h-12.5 flex items-center justify-center">
              <Menu className="w-6 h-6 text-[#333]" />
            </button>
          </>
        )}

        {/* Active */}
        <button className="bg-linear-to-b from-[#ff4f31] to-[#fe2b73] rounded-[10px] p-3 w-12.5 h-12.5 flex items-center justify-center shadow-md">
          <Car className="text-white" />
        </button>

        {/* Other Icons */}
        <button className="sidebar-btn">
          <Truck className="text-gray-400" />
        </button>

        <button className="sidebar-btn">
          <Users className="text-gray-400" />
        </button>
      </aside>
    </>
  );
}
