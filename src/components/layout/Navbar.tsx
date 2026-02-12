import { useState } from "react";
import { Bell, Settings, LogOut, Menu, ChevronDown } from "lucide-react";
import user from "../../assets/user.jpg";
import Button from "../common/Button";

interface Props {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-[#ebebeb] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative">
      {/* Left */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Hamburger */}
        <Button
          variant="outline"
          icon={<Menu className="w-5 h-5" />}
          className="lg:hidden sm:px-2! p-2!"
          onClick={() => {
            toggleSidebar();
            if (mobileMenuOpen) {
              setMobileMenuOpen(false);
            }
          }}
        />

        <div>
          <h1 className="text-sm sm:text-lg font-semibold text-[#333]">
            Security Gate Entry
          </h1>
          <p className="hidden lg:block text-[#999] text-xs sm:text-sm">
            Register vehicle arrival and capture entry photos
          </p>
        </div>
      </div>

      {/* Right - Desktop */}
      <div className="hidden md:flex items-center gap-4 lg:gap-5">
        {/* User */}
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] overflow-hidden">
            <img
              src={user}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-[#333]">Jothivelu</p>
            <p className="text-[11px] text-[#999]">Senior Manager</p>
          </div>
        </div>

        {/* Icons */}
        <Button
          variant="outline"
          className="p-2!"
          icon={<Bell className="w-5 h-5 text-[#8C8C8C]" />}
        />
        <Button
          variant="outline"
          className="p-2!"
          icon={<Settings className="w-5 h-5 text-[#8C8C8C]" />}
        />
        <Button
          variant="outline"
          className="bg-[#faedee] p-2! border-[#ffc0d1] hover:bg-[#ffe5ed]"
          icon={<LogOut className="w-5 h-5 text-[#FE306C]" />}
        />
      </div>

      {/* Mobile Right Icons */}
      <div className="flex md:hidden items-center gap-2">
        <Button
          variant="outline"
          className="p-2!"
          icon={<Bell className="w-5 h-5 text-[#8C8C8C]" />}
        />
        <Button
          className="p-2!"
          variant="outline"
          icon={
            <div
              className="cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <ChevronDown
                className={`w-5 h-5 text-[#333] transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          }
        />
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#ebebeb] shadow-lg z-50 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#ebebeb]">
              <div className="relative w-12 h-12 rounded-[10px] overflow-hidden">
                <img
                  src={user}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#333]">Jothivelu</p>
                <p className="text-xs text-[#999]">Senior Manager</p>
              </div>
            </div>

            {/* Menu Actions */}
            <div className="space-y-2 pt-2">
              <Button
                className="w-full justify-start gap-3 px-3 py-3! bg-transparent hover:bg-gray-50"
                icon={<Bell className="w-5 h-5 text-[#8C8C8C]" />}
              >
                <span className="text-sm text-[#333]">Notifications</span>
              </Button>

              <Button
                className="w-full justify-start gap-3 px-3 py-3! bg-transparent hover:bg-gray-50"
                icon={<Settings className="w-5 h-5 text-[#8C8C8C]" />}
              >
                <span className="text-sm text-[#333]">Settings</span>
              </Button>

              <Button
                className="w-full justify-start gap-3 px-3 py-3! bg-[#faedee] hover:bg-[#ffe5ed]"
                icon={<LogOut className="w-5 h-5 text-[#FE306C]" />}
              >
                <span className="text-sm text-[#FE306C]">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
