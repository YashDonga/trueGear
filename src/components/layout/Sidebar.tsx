import { useNavigate, useLocation } from "react-router-dom";
import { Car, Truck, Users, Menu, X, CheckCircle, ShieldUser } from "lucide-react";
import { ROUTES } from "../../constants/routes";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function Sidebar({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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

        {/* Security Dashboard - Active */}
        <button
          className={`rounded-[10px] p-3 w-12.5 h-12.5 flex items-center justify-center transition-all ${
            isActive(ROUTES.SECURITY_DASHBOARD)
              ? "bg-linear-to-b from-[#ff4f31] to-[#fe2b73] shadow-md"
              : "bg-[#fbfbfb] border border-[#ebebeb] hover:bg-[#f5f5f5]"
          }`}
          onClick={() => handleNavigation(ROUTES.SECURITY_DASHBOARD)}
        >
          <ShieldUser className={isActive(ROUTES.SECURITY_DASHBOARD) ? "text-white" : "text-gray-400"} />
        </button>

        {/* Quality Check Dashboard */}
        <button
          className={`rounded-[10px] p-3 w-12.5 h-12.5 flex items-center justify-center transition-all ${
            isActive(ROUTES.QUALITY_CHECK_DASHBOARD)
              ? "bg-linear-to-b from-[#ff4f31] to-[#fe2b73] shadow-md"
              : "bg-[#fbfbfb] border border-[#ebebeb] hover:bg-[#f5f5f5]"
          }`}
          onClick={() => handleNavigation(ROUTES.QUALITY_CHECK_DASHBOARD)}
        >
          <CheckCircle className={isActive(ROUTES.QUALITY_CHECK_DASHBOARD) ? "text-white" : "text-gray-400"} />
        </button>
      </aside>
    </>
  );
}
