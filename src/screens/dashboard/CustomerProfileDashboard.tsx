import { useState } from "react";
import {
  Mail,
  Car,
  Lock,
  Pen,
  Globe,
  History,
  FileText,
  TriangleAlert,
  Calendar,
  BellRing,
  Truck,
  SquareArrowOutUpRight,
  CarIcon,
  CreditCard,
  BadgeDollarSign,
  ReceiptText,
  Landmark,
  Shield,
  Stamp,
  CircleQuestionMark,
  Database,
  GitFork,
  Rows3,
  SquareCode,
} from "lucide-react";
import { CustomerProfile } from "../../components/cards/CustomerProfile";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { StatCard } from "../../components/cards/StatCard";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleModel: string;
  lastService: string;
  nextService: string;
  status: string;
}

interface ServiceHistory {
  id: number;
  date: string;
  serviceType: string;
  amount: number;
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

const mockServiceHistory: ServiceHistory[] = [
  {
    id: 1,
    date: "15 Jan 2026",
    serviceType: "Full Service + AC Check",
    amount: 4500,
    status: "Completed",
  },
  {
    id: 2,
    date: "10 Nov 2025",
    serviceType: "Tire Rotation & Alignment",
    amount: 1200,
    status: "Completed",
  },
  {
    id: 3,
    date: "15 Sep 2025",
    serviceType: "Oil Change & Filter",
    amount: 2800,
    status: "Completed",
  },
  {
    id: 4,
    date: "20 Jul 2025",
    serviceType: "Brake Inspection",
    amount: 1500,
    status: "Completed",
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

  const serviceHistoryData = {
    serviceRecords: 47,
    lastServiceAdvisor: "Sarah Mitchell",
    preferredTechnician: "David Chen",
    activeJobCards: ["JOB-2024-001", "JOB-2024-001"],
    nextServices: ["Oil Change", "Tire Rotation", "Brake Inspection"],
    lastVisitReason: "Warranty Claim Engine Diagnostics",
    visitAdvisor: "Sarah Mitchell",
  };

  const servicePreferencesData = {
    priorityLevel: "High" as const,
    loanerCarRequired: true,
    courtesyVehicleEligible: true,
    courtesyVehicleType: "Premium SUV",
    appointmentPreference: "Drop-off (Morning 8-10 AM)",
    serviceReminderOptIn: true,
    specialHandlingNotes:
      "Customer requires wheelchair accessible facility. Prefers morning appointments",
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
        <>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-4 md:p-5 sm:p-6">
              <h3 className="text-[14px] md:text-[16px] font-semibold text-[#333] mb-4">
                Identity & Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Customer ID
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    CUST-2024-1847
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Account Number
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    DMS-ACC-9876543
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Full Name/Business
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Anderson Automotive Solutions Inc,
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Primary Contact
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Michael Anderson
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Email (Primary)
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1 break-all">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    michaelanderson@andersonauto.com
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 border-b border-[#E5E7EB] gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Phone (Primary)
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    +1 (555) 123-4567
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center py-2 sm:py-3 gap-0.5 sm:gap-0">
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                    Alternate Phone
                  </span>
                  <span className="sm:w-1/2 text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    +1 (555) 123-4568
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-4 md:p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                <h3 className="text-[14px] md:text-[16px] font-semibold text-[#333]">
                  Addresses & Location
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setIsEditAddressesOpen(true)}
                  className="text-xs md:text-sm self-start sm:self-auto"
                >
                  <Pen className="w-4 h-4 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">Edit Addresses</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {addressFields.map((field, index) => (
                    <div key={index}>
                      <span className="text-[11px] sm:text-[12px] md:text-[14px] text-[#333] flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        {field.icon}
                        {field.label}
                      </span>
                      <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#999999] block break-words">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-4 md:p-5 sm:p-6">
              <div className="flex justify-between">
                <h3 className="text-[14px] md:text-[16px] font-semibold text-[#333] mb-4">
                  Relationship & Marketing
                </h3>
              </div>
              <div className="space-y-4">
                {relationshipFields.map((field, index) => (
                  <div
                    key={index}
                    className="py-2 sm:py-3 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:gap-3 gap-1.5"
                  >
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      {field.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-1.5 sm:mb-2 md:mb-3">
                        {field.label}
                      </span>
                      <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#333]">
                        {field.label === "Customer Type / Segment" ||
                        field.label === "Loyalty Program Status" ? (
                          <span className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#F6F6F6] text-[#333] rounded-[5px] text-[10px] sm:text-[11px] md:text-[12px] font-medium inline-block">
                            {field.value}
                          </span>
                        ) : (
                          field.value
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-2 sm:py-3 border-b border-[#E5E7EB] last:border-b-0 flex flex-col sm:flex-row sm:gap-3 gap-1.5">
                <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </span>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2 sm:mb-3">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-1 sm:mb-3">
                      Internal Notes
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddNotesOpen(true)}
                      className="text-[10px] sm:text-xs self-start"
                    >
                      + Add Notes
                    </Button>
                  </div>
                  <div className="bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] p-2 sm:p-2.5">
                    <p className="text-[#8C8C8C] text-[10px] sm:text-[11px] md:text-[12px] mb-1.5 sm:mb-2">
                      Jan 15, 2024 at 10:30 AM
                    </p>
                    <p className="text-[#333333] text-[11px] sm:text-[12px] md:text-[14px]">
                      Preferred customer - Fleet account with 12 vehicles.
                      Requires detailed service reports for each vehicle.
                      Monthly billing cycle. Contact via email for all
                      non-urgent matters. Loaner vehicle required for service
                      appointments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-4 md:p-5 sm:p-6">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-1 sm:mb-1.5">
                  Communication Preferences & Consent
                </h3>
                <p className="text-[#999999] text-[10px] sm:text-[11px] md:text-[12px]">
                  Communication Preferences & Consent
                </p>
              </div>
              {/* First Row - Communication Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-5 mb-4 sm:mb-6 border-b border-[#E5E7EB] pb-4 sm:pb-6">
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Preferred Contact Method
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Email
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Preferred Language
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    English
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <History
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Best Time to Contact
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    9 AM - 5 PM (Business Hours)
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <History
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Consent Source
                  </span>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block bg-[#F6F6F6] border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      UI
                    </p>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block bg-[#F6F6F6] border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      v2.1
                    </p>
                  </div>
                </div>
              </div>
              {/* Second Row - Marketing Consent */}
              <div>
                <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#999] mb-2 sm:mb-3">
                  Marketing Consent
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex-col">
                    <div
                      className={`flex items-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 rounded-[5px] border ${
                        marketingConsent.email
                          ? "bg-[#e8f5e9] border-[#4caf50]"
                          : "bg-[#f5f5f5] border-[#e0e0e0]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg
                          className="size-3.5 sm:size-4 md:size-5"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M3.33333 5.83333H16.6667V14.1667C16.6667 14.6087 16.4911 15.0326 16.1785 15.3452C15.866 15.6577 15.442 15.8333 15 15.8333H5C4.55797 15.8333 4.13405 15.6577 3.82149 15.3452C3.50893 15.0326 3.33333 14.6087 3.33333 14.1667V5.83333Z"
                            stroke={marketingConsent.email ? "#4caf50" : "#999"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M16.6667 5.83333L10 10.8333L3.33333 5.83333"
                            stroke={marketingConsent.email ? "#4caf50" : "#999"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span
                          className={`text-[11px] sm:text-[12px] md:text-[14px] font-medium ${marketingConsent.email ? "text-[#2e7d32]" : "text-[#999]"}`}
                        >
                          Email
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#666]">
                      Email Consent: 2024-01-15
                    </span>
                  </div>

                  <div className="flex-col">
                    <div
                      className={`flex items-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 rounded-[5px] border ${
                        marketingConsent.sms
                          ? "bg-[#e8f5e9] border-[#4caf50]"
                          : "bg-[#f5f5f5] border-[#e0e0e0]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg
                          className="size-3.5 sm:size-4 md:size-5"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M5.83333 3.33333H14.1667C15.0871 3.33333 15.8333 4.07953 15.8333 5V12.5C15.8333 13.4205 15.0871 14.1667 14.1667 14.1667H7.5L3.33333 16.6667V5C3.33333 4.07953 4.07953 3.33333 5 3.33333H5.83333Z"
                            stroke={marketingConsent.sms ? "#4caf50" : "#999"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span
                          className={`text-[11px] sm:text-[12px] md:text-[14px] font-medium ${marketingConsent.sms ? "text-[#2e7d32]" : "text-[#999]"}`}
                        >
                          SMS
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#666]">
                      SMS Consent: 2024-01-15
                    </span>
                  </div>
                  <div className="flex-col">
                    <div
                      className={`flex items-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 rounded-[5px] border ${
                        marketingConsent.marketing
                          ? "bg-[#e8f5e9] border-[#4caf50]"
                          : "bg-[#f5f5f5] border-[#e0e0e0]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg
                          className="size-3.5 sm:size-4 md:size-5"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M15 5.83333L9.16667 10L15 14.1667"
                            stroke={
                              marketingConsent.marketing ? "#4caf50" : "#999"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 5.83333V14.1667"
                            stroke={
                              marketingConsent.marketing ? "#4caf50" : "#999"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span
                          className={`text-[11px] sm:text-[12px] md:text-[14px] font-medium ${marketingConsent.marketing ? "text-[#2e7d32]" : "text-[#999]"}`}
                        >
                          Marketing
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#666]">
                      Marketing Consent: 2024-01-15
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "service" && (
        <>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-1 sm:mb-1.5">
                  Service History
                </h3>
                <p className="text-[#999999] text-[10px] sm:text-[11px] md:text-[12px]">
                  Complete service and maintenance records
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-5 mb-4 sm:mb-6 border-b border-[#E5E7EB] pb-4 sm:pb-6">
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] mb-2 sm:mb-3 block">
                    Service History
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    47 Service Records
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] mb-2 sm:mb-3 block">
                    Last Visit Reason
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Warranty Claim Engine Diagnostics
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] mb-2 sm:mb-3 block">
                    Last Service Advisor
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Sarah Mitchell
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] mb-2 sm:mb-3 block">
                    Visit Advisor
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Sarah Mitchell
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] mb-2 sm:mb-3 block">
                    Preferred Technician
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    David Chen
                  </p>
                </div>
                <div></div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <History
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Active Job Cards
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block bg-[#F6F6F6] border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      JOB-2024-001
                    </p>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block bg-[#F6F6F6] border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      JOB-2024-001
                    </p>
                  </div>
                </div>
                <div></div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Calendar
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Next Recommended Services
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      Oil Change
                    </p>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      Tire Rotation
                    </p>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      Brake Inspection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-1 sm:mb-1.5">
                  Service Preferences
                </h3>
                <p className="text-[#999999] text-[10px] sm:text-[11px] md:text-[12px]">
                  Complete service and maintenance records
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-5 mb-4 sm:mb-6 border-b border-[#E5E7EB] pb-4 sm:pb-6">
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <TriangleAlert
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Priority Level
                  </span>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#FE3066] border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-white font-medium">
                      High
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Loaner Car Required
                  </span>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#0061FF] border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-white font-medium">
                      Yes
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Courtesy Vehicle Entitlement
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#0061FF] border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-white font-medium">
                      Eligible
                    </p>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-white border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                      Premium SUV
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Calendar
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Appointment Preference
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Drop-off (Morning 8-10 AM)
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <BellRing
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Service Reminder Opt-in
                  </span>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#0061FF] border-[#E5E7EB] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-white font-medium">
                      Enabled
                    </p>
                  </div>
                </div>
                <div></div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <FileText
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Special Handling Notes
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    Customer requires wheelchair accessible facility. Prefers
                    morning appointments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "assets" && (
        <div className="bg-white rounded-[10px] border border-[#e5e7eb]">
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-3 sm:mb-4">
              Asset Management
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-7.5">
              <StatCard
                title="Total Vehicles"
                value="03"
                icon={
                  <Truck
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#BFBFBF]"
                    strokeWidth={1.5}
                  />
                }
              />
              <StatCard
                title="Last Service"
                value="Nov 8,2024"
                icon={
                  <Truck
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#BFBFBF]"
                    strokeWidth={1.5}
                  />
                }
              />
              <StatCard
                title="Next Service"
                value="Feb 8, 2025"
                icon={
                  <Truck
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#BFBFBF]"
                    strokeWidth={1.5}
                  />
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333]">
                Owned Vehicles
              </h3>
              <Button variant="outline" className="text-[11px] sm:text-xs md:text-sm self-start sm:self-auto">
                + Add Vehicle
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {mockVehicles.map((vehicle) => (
                <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
                  <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-linear-to-b from-[#ff4f31] to-[#fe2b73] flex items-center justify-center text-white shadow-md shadow-red-100 shrink-0">
                      <CarIcon
                        size={16}
                        strokeWidth={2}
                        className="sm:w-4.5 sm:h-4.5 md:w-5 md:h-5"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">
                        {vehicle.vehicleModel}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 md:mt-1">
                        {vehicle.vehicleNumber}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <Button
                      variant="outline"
                      className="text-[11px] sm:text-xs md:text-sm h-auto py-1 sm:py-1.5 px-2.5 sm:px-3 border-0!"
                    >
                      <SquareArrowOutUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      View History
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "financial" && (
        <>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-3 sm:p-4 md:p-5">
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-3 sm:mb-4">
                Financial Information
              </h3>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-[#f0f0f0] gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      Preferred Payment Method
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] ml-5 sm:ml-0">
                    Direct Debit (Monthly)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-[#f0f0f0] gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <BadgeDollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      $Total Lifetime Value (LTV)
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#00BF06] ml-5 sm:ml-0">
                    $47,823.00
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-[#f0f0f0] gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <ReceiptText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      Tax ID/VAT No.
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] ml-5 sm:ml-0">
                    US-VAT-987654321
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-[#f0f0f0] gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      Last Invoice Date
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] ml-5 sm:ml-0">
                    November 1, 2024
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-[#f0f0f0] gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      Last Payment Date
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#333] ml-5 sm:ml-0">
                    November 5, 2024
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] text-[#999999]">
                      Payment Status
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#00BF061A] border-[#00BF06] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-1.5 md:py-2.5 text-[#00BF06] font-medium ml-5 sm:ml-0 w-fit">
                    Up to Date
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] mb-6">
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-1 sm:mb-1.5">
                  Insurance & Agreements
                </h3>
                <p className="text-[#999999] text-[10px] sm:text-[11px] md:text-[12px]">
                  Policy details auto-populated from DMS
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-5 mb-4 sm:mb-6 border-b border-[#E5E7EB] pb-4 sm:pb-6">
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Insurance Provider
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    State Farm Insurance
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <FileText
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Policy Number
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    SF-AUTO-987654321
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Calendar
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    Policy Expiry
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    December 31, 2025
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Stamp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0" color="#999999" />
                    Fleet Agreement ID
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    FLEET-CONTRACT-2024-789
                  </p>
                </div>
                <div>
                  <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#999] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <CircleQuestionMark
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0"
                      color="#999999"
                    />
                    SLA/Response Time
                  </span>
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] border border-[#E5E7EB] rounded-[5px] px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 text-[#333] font-medium">
                    24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "integration" && (
        <div className="bg-white rounded-[10px] border border-[#e5e7eb]">
          <div className="p-3 sm:p-4 md:p-5">
            <h3 className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#333] mb-3 sm:mb-4">
              Integration
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 sm:gap-y-0">
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      DMS System
                    </span>
                    <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#333] truncate">
                      CDK Global
                    </span>
                  </div>
                </div>
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      Sync Status
                    </span>
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] inline-block border bg-[#00BF061A] border-[#00BF06] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2.5 text-[#00BF06] font-medium w-fit">
                      Synced
                    </p>
                  </div>
                </div>
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <GitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      Branch/Dealer Code
                    </span>
                    <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#333] truncate">
                      SF-MAIN-001
                    </span>
                  </div>
                </div>
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <Rows3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      Source of Truth
                    </span>
                    <p className="w-fit self-start text-[11px] sm:text-[12px] md:text-[14px] bg-[#F6F6F6] rounded-[25px] px-2.5 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2.5 text-[#333] font-medium">
                      DMS
                    </p>
                  </div>
                </div>
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      Last Sync Timestamp
                    </span>
                    <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#333] truncate">
                      2024-11-14 09:23:45 UTC
                    </span>
                  </div>
                </div>
                <div className="py-1.5 sm:py-2 md:py-3 flex gap-1.5 sm:gap-2 md:gap-3">
                  <SquareCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-[#999999] mb-0.5 sm:mb-1">
                      Integration Version
                    </span>
                    <span className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#333]">
                      v2.4.1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Full Name / Business
            </label>
            <input
              type="text"
              value={profileForm.fullName}
              onChange={(e) =>
                setProfileForm({ ...profileForm, fullName: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Primary Contact
            </label>
            <input
              type="text"
              value={profileForm.primaryContact}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  primaryContact: e.target.value,
                })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Email (Primary)
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Phone (Primary)
            </label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={(e) =>
                setProfileForm({ ...profileForm, phone: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Alternate Phone
            </label>
            <input
              type="text"
              value={profileForm.alternatePhone}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  alternatePhone: e.target.value,
                })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
          </div>
          <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditProfileOpen(false)}
              className="text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={() => setIsEditProfileOpen(false)}
              className="text-xs sm:text-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Addresses Modal */}
      <Modal
        isOpen={isEditAddressesOpen}
        onClose={() => setIsEditAddressesOpen(false)}
        title="Edit Addresses"
        size="lg"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Service Address
            </label>
            <textarea
              value={addressForm.serviceAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  serviceAddress: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Shipping/Delivery Address
            </label>
            <textarea
              value={addressForm.shippingAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  shippingAddress: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Geo Coordinates
            </label>
            <input
              type="text"
              value={addressForm.geoCoordinates}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  geoCoordinates: e.target.value,
                })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
            <p className="text-[10px] sm:text-xs text-[#8C8C8C] mt-1">
              <span className="font-semibold">Format:</span> latitude° N/S,
              longitude® E/W
            </p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Address Search & Location
            </label>
            <div className="bg-[#F6F6F6] border border-[#E5E7EB] p-3 sm:p-5">
              <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
                Google Maps API Key
              </label>
              <input
                type="text"
                placeholder="Enter your Google Maps API key"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border bg-white border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
              />
              <p className="text-[10px] sm:text-xs text-[#8C8C8C] mt-1">
                Get your API key from
                <span className="text-[#0061FF]">Google Cloud Console</span>
                and enable Places API
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditAddressesOpen(false)}
              className="text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={() => setIsEditAddressesOpen(false)}
              className="text-xs sm:text-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Notes Modal */}
      <Modal
        isOpen={isAddNotesOpen}
        onClose={() => setIsAddNotesOpen(false)}
        title="Add Internal Notes"
        size="md"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333] mb-1 sm:mb-1.5">
              Notes
            </label>
            <textarea
              value={notesForm.notes}
              onChange={(e) =>
                setNotesForm({ ...notesForm, notes: e.target.value })
              }
              rows={6}
              placeholder="Enter internal notes here..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent resize-none"
            />
            <p className="text-[10px] sm:text-xs text-[#999] mt-1">
              Maximum 1000 characters. This note will be timestamped and added
              to the customer record.
            </p>
          </div>
          <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button variant="outline" onClick={() => setIsAddNotesOpen(false)} className="text-xs sm:text-sm">
              Cancel
            </Button>
            <Button variant="gradient" onClick={() => setIsAddNotesOpen(false)} className="text-xs sm:text-sm">
              Add Notes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerProfileDashboard;
