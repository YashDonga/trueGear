import { useState } from "react";
import { CustomerProfile } from "../../components/cards/CustomerProfile";
import Button from "../../components/common/Button";
import { OverviewTab } from "../../components/customer-profile/OverviewTab";
import { ServiceTab } from "../../components/customer-profile/ServiceTab";
import { AssetsTab } from "../../components/customer-profile/AssetsTab";
import { FinancialTab } from "../../components/customer-profile/FinancialTab";
import { IntegrationTab } from "../../components/customer-profile/IntegrationTab";
import { EditProfileModal } from "../../components/customer-profile/EditProfileModal";
import { EditAddressesModal } from "../../components/customer-profile/EditAddressesModal";
import { AddNotesModal } from "../../components/customer-profile/AddNotesModal";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleModel: string;
  lastService: string;
  nextService: string;
  status: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    vehicleNumber: "KA-01-AB-1234",
    vehicleModel: "Toyota Innova Crysta",
    lastService: "15 Jan 2026",
    nextService: "15 Apr 2026",
    status: "Active",
  },
  {
    id: 2,
    vehicleNumber: "KA-05-CD-5678",
    vehicleModel: "Honda City",
    lastService: "20 Dec 2025",
    nextService: "20 Mar 2026",
    status: "Active",
  },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "service", label: "Service & Operations" },
  { id: "assets", label: "Assets & Vehicles" },
  { id: "financial", label: "Financial" },
  { id: "integration", label: "Integration" },
];

function CustomerProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Modal states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAddressesOpen, setIsEditAddressesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: "Anderson Automotive Solutions Inc",
    primaryContact: "Michael Anderson",
    email: "michaelanderson@andersonauto.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 123-4568",
  });

  const [addressForm, setAddressForm] = useState({
    billingAddress:
      "2312 Business Rd, Ste 203, San Francisco, CA 94102, United States",
    shippingAddress:
      "5876 Logistics Pocket, Bldg 4, Oakland, CA 94621, United States",
    serviceAddress:
      "2312 Business Rd, Ste Service Bay 3, San Francisco, CA 94102, United States",
    geoCoordinates: "37.7749, -122.4194",
  });

  const [notesForm, setNotesForm] = useState({
    notes: "",
  });

  const addressFields = [
    {
      label: "Billing Address",
      value:
        "2312 Business Rd, Ste 203, San Francisco, CA 94102, United States",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 14C8 14 12 10.5 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 10.5 8 14 8 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="8"
            cy="7"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Shipping/Delivery Address",
      value: "5876 Logistics Pocket, Bldg 4, Oakland, CA 94621, United States",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 14C8 14 12 10.5 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 10.5 8 14 8 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="8"
            cy="7"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Service Address",
      value:
        "2312 Business Rd, Ste Service Bay 3, San Francisco, CA 94102, United States",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 14C8 14 12 10.5 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 10.5 8 14 8 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="8"
            cy="7"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Geo Coordinates",
      value: "37.7749, -122.4194",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2 8H14M8 2C9.5 4 10 6 10 8C10 10 9.5 12 8 14C6.5 12 6 10 6 8C6 6 6.5 4 8 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  const relationshipFields = [
    {
      label: "First Service Date",
      value: "January 18, 2022",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <rect
            x="2"
            y="3"
            width="12"
            height="11"
            rx="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2 6H14M5 2V4M11 2V4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Customer Type / Segment",
      value: "Fleet/Commercial",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2 14V13C2 11.3431 3.34315 10 5 10H11C12.6569 10 14 11.3431 14 13V14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Lead Source",
      value: "Referral-Industry Partner",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M8 5V8L10 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Loyalty Program Status",
      value: "Gold Member",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  const marketingConsent = {
    email: true,
    sms: true,
    marketing: true,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <button className="text-[11px] sm:text-[12px] text-[#676879] hover:text-[#333]">
          Back to List
        </button>
      </div>

      {/* Profile Header */}
      <div className="mb-6">
        <CustomerProfile
          companyName="Anderson Automotive Solutions Inc"
          customerId="ID: CUST-2024-1847"
          accountNumber="Account DMS-ACC-9616543"
          address1="michael andersonépandersonauto.com"
          phone1="+1 (555) 123-456/"
          onEditClick={() => setIsEditProfileOpen(true)}
        />
      </div>

      {/* Tabs - Filter Style */}
      <div className="flex gap-1.5 sm:gap-2 bg-[#EDEDED] p-1 rounded-[10px] border border-[#DBDBDB] overflow-x-auto md:w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant="secondary"
            className={`rounded-lg px-2.5 sm:px-3 md:px-4 h-8 sm:h-9 md:h-10! py-1.5 sm:py-2 text-xs sm:text-sm transition-colors focus:outline-none whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white border border-[#e5e7eb] shadow-sm text-gray-700! hover:bg-white"
                : "bg-[#EDEDED]! text-gray-700! hover:bg-[#EDEDED]!"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          addressFields={addressFields}
          relationshipFields={relationshipFields}
          marketingConsent={marketingConsent}
          onEditAddresses={() => setIsEditAddressesOpen(true)}
          onAddNotes={() => setIsAddNotesOpen(true)}
        />
      )}

      {activeTab === "service" && <ServiceTab />}

      {activeTab === "assets" && <AssetsTab vehicles={mockVehicles} />}

      {activeTab === "financial" && <FinancialTab />}

      {activeTab === "integration" && <IntegrationTab />}

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profileForm={profileForm}
        setProfileForm={setProfileForm}
      />

      <EditAddressesModal
        isOpen={isEditAddressesOpen}
        onClose={() => setIsEditAddressesOpen(false)}
        addressForm={addressForm}
        setAddressForm={setAddressForm}
      />

      <AddNotesModal
        isOpen={isAddNotesOpen}
        onClose={() => setIsAddNotesOpen(false)}
        notesForm={notesForm}
        setNotesForm={setNotesForm}
      />
    </div>
  );
}

export default CustomerProfileDashboard;
