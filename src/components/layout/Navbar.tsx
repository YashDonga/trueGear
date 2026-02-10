import { Bell, Settings, LogOut, Menu } from "lucide-react";
import user from "../../assets/user.jpg"
interface Props {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: Props) {
  return (
    <header className="bg-white border-b border-[#ebebeb] px-4 sm:px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Hamburger */}
        <button
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-[#333]">
            Security Gate Entry
          </h1>
          <p className="hidden sm:block text-[#999] text-xs sm:text-sm">
            Register vehicle arrival and capture entry photos
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* User */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-[10px] overflow-hidden">
            <img 
              src={user} 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-[#333]">Jothivelu</p>
            <p className="text-[11px] text-[#999]">Senior Manager</p>
          </div>
        </div>

        {/* Icons */}
        <button className="bg-[#fbfbfb] border border-[#ebebeb] rounded-[10px] p-3.25 hover:bg-gray-100">
          <Bell className="w-6 h-6 text-[#8C8C8C]" />
        </button>
        <button className="bg-[#fbfbfb] border border-[#ebebeb] rounded-[10px] p-3.25 hover:bg-gray-100">
          <Settings className="w-6 h-6 text-[#8C8C8C]" />
        </button>
        <button className="bg-[#faedee] border border-[#ffc0d1] rounded-[10px] p-3.25 hover:bg-[#ffe5ed]">
          <LogOut className="w-6 h-6 text-[#FE306C]" />
        </button>

      </div>
    </header>
  );
}
