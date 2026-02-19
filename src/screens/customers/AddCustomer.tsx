import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Car, Phone, Mail, Search, Plus, X, Check } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { ROUTES } from "../../constants/routes";

interface CustomerData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  vehicleNumber: string;
  vehicleMake: string;
  vehicleModel: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

// Mock existing customers for demo
const mockCustomers: Customer[] = [
  { id: "1", firstName: "Ravi", lastName: "Varma", phoneNumber: "9876543210", email: "ravi@example.com" },
  { id: "2", firstName: "John", lastName: "Smith", phoneNumber: "9876543211", email: "john@example.com" },
  { id: "3", firstName: "Priya", lastName: "Sharma", phoneNumber: "9876543212", email: "priya@example.com" },
  { id: "4", firstName: "Amit", lastName: "Kumar", phoneNumber: "9876543213", email: "amit@example.com" },
  { id: "5", firstName: "Sneha", lastName: "Patel", phoneNumber: "9876543214", email: "sneha@example.com" },
];

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  
  const [formData, setFormData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    vehicleNumber: "",
    vehicleMake: "",
    vehicleModel: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  // Filter customers based on search
  const filteredCustomers = mockCustomers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      customer.phoneNumber.includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
    setFormData(prev => ({
      ...prev,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
    }));
    setIsDropdownOpen(false);
    setShowNewCustomerForm(false);
  };

  const handleAddNewCustomer = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setShowNewCustomerForm(true);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      vehicleNumber: "",
      vehicleMake: "",
      vehicleModel: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CustomerData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }
    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = "Vehicle make is required";
    }
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = "Vehicle model is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would save the customer data to backend
      // For now, we'll store it in sessionStorage and proceed to AddVehicle
      sessionStorage.setItem("customerData", JSON.stringify(formData));
      navigate(ROUTES.ADD_VEHICLE);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.SECURITY_DASHBOARD);
  };

  const clearSelection = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setShowNewCustomerForm(false);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      vehicleNumber: "",
      vehicleMake: "",
      vehicleModel: "",
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Security Guard" },
          { label: "Add Customer" }
        ]}
      />

      {/* Customer Search Section */}
      {!showNewCustomerForm && (
        <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
          <div className="mb-4">
            <h2 className="text-[#333] text-[15px] sm:text-[16px] mb-1">
              Search Customer
            </h2>
            <p className="text-[#999] text-[12px]">
              Search for an existing customer or add a new one
            </p>
          </div>

          {/* Search Input */}
          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search by name, phone number, or email..."
                className="w-full h-12 border border-[#e5e7eb] rounded-[10px] pl-10 pr-10 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none focus:border-[#04c397] transition-colors"
              />
              {selectedCustomer && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#e5e7eb] rounded-[10px] shadow-lg max-h-60 overflow-y-auto">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] border-b border-[#f0f0f0] last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#ff4f31] text-white flex items-center justify-center font-medium">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#333] text-[14px] font-medium">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <p className="text-[#999] text-[12px]">
                            {customer.phoneNumber} • {customer.email}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center">
                    <p className="text-[#999] text-[13px] mb-2">No customer found</p>
                    <button
                      type="button"
                      onClick={handleAddNewCustomer}
                      className="text-[#0066FF] text-[13px] font-medium hover:underline flex items-center gap-1 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Customer
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add New Customer Button */}
          {!selectedCustomer && (
            <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
              <button
                type="button"
                onClick={handleAddNewCustomer}
                className="flex items-center gap-2 text-[#0066FF] text-[14px] font-medium hover:underline"
              >
                <Plus className="w-4 h-4" />
                Add New Customer
              </button>
            </div>
          )}

          {/* Selected Customer Info */}
          {selectedCustomer && (
            <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#04c397] text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[#333] text-[14px] font-medium">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </p>
                    <p className="text-[#999] text-[12px]">
                      {selectedCustomer.phoneNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-[#999] text-[12px] hover:text-[#333]"
                >
                  Change
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Customer & Vehicle Details Form */}
      {(showNewCustomerForm || selectedCustomer) && (
        <form onSubmit={handleSubmit}>
          {/* Customer Details Section */}
          <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
            <h3 className="text-[#333] text-[14px] sm:text-[15px] font-medium mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#ff4f31]" />
              Customer Details
              {selectedCustomer && <span className="text-[#04c397] text-[12px]">(Existing Customer)</span>}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className={`w-full h-11 sm:h-12 border rounded-[10px] px-3 sm:px-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors ${
                    errors.firstName 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#e5e7eb] focus:border-[#04c397]"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className={`w-full h-11 sm:h-12 border rounded-[10px] px-3 sm:px-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors ${
                    errors.lastName 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#e5e7eb] focus:border-[#04c397]"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={`w-full h-11 sm:h-12 border rounded-[10px] pl-10 pr-3 sm:pr-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors ${
                      errors.phoneNumber 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-[#e5e7eb] focus:border-[#04c397]"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Email <span className="text-[#999]">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full h-11 sm:h-12 border border-[#e5e7eb] rounded-[10px] pl-10 pr-3 sm:pr-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none focus:border-[#04c397] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details Section */}
          <div className="bg-white rounded-[10px] p-4 sm:p-5 md:p-6 mb-5">
            <h3 className="text-[#333] text-[14px] sm:text-[15px] font-medium mb-4 flex items-center gap-2">
              <Car className="w-4 h-4 text-[#ff4f31]" />
              Vehicle Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Number */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g., BL 00 MY ZN"
                  className={`w-full h-11 sm:h-12 border rounded-[10px] px-3 sm:px-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors uppercase ${
                    errors.vehicleNumber 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#e5e7eb] focus:border-[#04c397]"
                  }`}
                />
                {errors.vehicleNumber && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.vehicleNumber}</p>
                )}
              </div>

              {/* Vehicle Make */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Vehicle Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  placeholder="e.g., Maruti, Hyundai, Toyota"
                  className={`w-full h-11 sm:h-12 border rounded-[10px] px-3 sm:px-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors ${
                    errors.vehicleMake 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#e5e7eb] focus:border-[#04c397]"
                  }`}
                />
                {errors.vehicleMake && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.vehicleMake}</p>
                )}
              </div>

              {/* Vehicle Model */}
              <div>
                <label className="block text-[#333] text-[13px] font-medium mb-1.5">
                  Vehicle Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g., Swift, Creta, Innova"
                  className={`w-full h-11 sm:h-12 border rounded-[10px] px-3 sm:px-4 text-[14px] text-[#333] placeholder:text-[#bfbfbf] outline-none transition-colors ${
                    errors.vehicleModel 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-[#e5e7eb] focus:border-[#04c397]"
                  }`}
                />
                {errors.vehicleModel && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.vehicleModel}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="gradient"
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Continue to Photo Capture
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddCustomer;

