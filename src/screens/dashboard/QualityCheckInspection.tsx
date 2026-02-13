import { useState } from "react";
import truck from "../../assets/truck.png";
import { InspectionSection } from "../../components/cards/InspectionSection";
import ProgressSteps from "../../components/cards/ProgressSteps";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import BreakRatingSection from "../../components/cards/BreakRatingSection";
import { DetectedIssue } from "../../components/cards/DetectedIssue";
import { FindingsSection } from "../../components/cards/FindingsSection";
import { FailedItemSection } from "../../components/cards/FailedItemSection";
import { BreakTestSummary } from "../../components/cards/BreakTestSummary";
import { CriticalAlert } from "../../components/cards/CriticalAlert";
import QCRatingSection from "../../components/cards/QCRatingSection";
import QCRemarkSection from "../../components/cards/QCRemarkSection";
import BreakRemarkSection from "../../components/cards/BreakRemarkSection";
import { UploadCategoryCards } from "../../components/cards/UploadCategoryCards";
import QCSuccess from "../../components/cards/QCSuccess";

const QualityCheckInspection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSaveAndContinue = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const bodyPaintItems = [
    {
      label: "Front Bumper Condition",
      description: "Scratches, cracks or impact inspection",
    },
    { label: "Rear Bumper Condition" },
    { label: "Door Panels (All)", description: "" },
    { label: "Hood/Bonnet Condition" },
    { label: "Paint/Finish Quality" },
  ];

  const lightsItems = [
    {
      label: "Headlights (both)",
      description: "Functionality and clarity inspection",
    },
    { label: "Tail Lights (both)" },
    { label: "Fog Lights" },
    { label: "Indicators (All)" },
    { label: "Brake Lights" },
  ];

  const mirrorsGlassItems = [
    { label: "Windshield Condition" },
    { label: "Rear Window" },
    { label: "Side Mirrors (both)" },
    { label: "Door Glass (All)" },
  ];

  const tyresRimsItems = [
    { label: "Front Left Tyre" },
    { label: "Front Right Tyre" },
    { label: "Rear Left Tyre" },
    { label: "Rear Right Tyre" },
    { label: "Spare Tyre" },
    { label: "Rim Condition (All)" },
  ];

  const seatupholstryItems = [
    { label: "Driver Seat Condition" },
    { label: "Passenger Seats" },
    { label: "Seat Belts (All)" },
    { label: "Floor Mats" },
  ];

  const dashboardindicatorItems = [
    { label: "Speedometer" },
    { label: "Fuel Gauge" },
    { label: "Warning Lights" },
    { label: "Odometer" },
  ];

  const ACinfotainmentItems = [
    { label: "AC Cooling Performance" },
    { label: "AC Heating" },
    { label: "Audio System" },
    { label: "Touchscreen/Display" },
  ];

  const cabincleanlinessItems = [
    { label: "Dashboard Cleaned" },
    { label: "Carpet Vacuumed" },
    { label: "Door Panels Wiped" },
    { label: "Windows Cleaned (Interior)" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Exterior
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[#333] text-[18px] md:text-[20px] font-semibold">
                  Exterior Inspection
                </h1>
                <p className="text-[#999] text-[12px]">
                  Vehicles awaiting quality inspection
                </p>
              </div>
            </div>
            <InspectionSection
              title="Body & Paint"
              description="Scratches, Cracks or impact inspection"
              progress="0/5"
              items={bodyPaintItems}
            />
            <InspectionSection
              title="Lights & Indicators"
              description="Functionality and clarity inspection"
              progress="0/5"
              items={lightsItems}
            />
            <InspectionSection
              title="Mirrors & Glass"
              description="Functionality and clarity inspection"
              progress="0/4"
              items={mirrorsGlassItems}
            />
            <InspectionSection
              title="Tyres & Rims"
              description="Condition and Pressure inspection"
              progress="0/6"
              items={tyresRimsItems}
            />
          </>
        );
      case 2: // Interior
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[#333] text-[18px] md:text-[20px] font-semibold">
                  Interior Inspection
                </h1>
                <p className="text-[#999] text-[12px]">
                  Vehicles awaiting quality inspection
                </p>
              </div>
            </div>
            <InspectionSection
              title="Seats & Upholstery"
              description="Vehicles awaiting quality inspection"
              progress="0/4"
              items={seatupholstryItems}
            />
            <InspectionSection
              title="Dashboard Indicators"
              description="Vehicles awaiting quality inspection"
              progress="0/4"
              items={dashboardindicatorItems}
            />
            <InspectionSection
              title="AC & Infotainment"
              description="Vehicles awaiting quality inspection"
              progress="0/4"
              items={ACinfotainmentItems}
            />
            <InspectionSection
              title="Cabin Cleanliness"
              description="Vehicles awaiting quality inspection"
              progress="0/4"
              items={cabincleanlinessItems}
            />
          </>
        );
      case 3: // Brake
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[#333] text-[18px] md:text-[20px] font-semibold">
                  Brake Inspection
                </h1>
                <p className="text-[#999] text-[12px]">
                  Brake system inspection
                </p>
              </div>
            </div>
            <BreakRatingSection
              title="Brake Performance"
              description="Rate overall brake performance"
            />

            {/* Detected Issues */}
            <DetectedIssue
              title="Detected Issues"
              description="Rate overall brake performance"
            />
            <BreakRemarkSection
              title="Remarks"
              description="Rate overall brake performance"
            />
          </>
        );
      case 4: // Findings
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[#333] text-[18px] md:text-[20px] font-semibold">
                  Record Findings
                </h1>
                <p className="text-[#999] text-[12px]">
                  Vehicles awaiting quality inspection
                </p>
              </div>
            </div>
            <FindingsSection />
            <FailedItemSection
              title="Failed Items"
              description="Rate overall brake performance"
            />
            <BreakTestSummary
              title="Brake Test Summary"
              description="Rate overall brake performance"
            />
            <CriticalAlert />
            <QCRatingSection
              title="Overall QC Status"
              description="Rate overall brake performance"
            />
            <QCRemarkSection
              title="Final Remarks"
              description="Rate overall brake performance"
            />
          </>
        );
      case 5: // Photos
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[#333] text-[18px] md:text-[20px] font-semibold">
                  Upload Photos
                </h1>
                <p className="text-[#999] text-[12px]">
                  Add inspection photos with tags
                </p>
              </div>
            </div>
            <UploadCategoryCards/>
          </>
        );
      case 6: // Submit
        return (
          <>
            <QCSuccess/>
            
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "QC Team" }, { label: "Vehicle Details" }]}
      />
      <div className="bg-white rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden">
            <img
              src={truck}
              alt="Vehicle"
              className="max-w-17.5 object-contain "
            />
          </div>
          <div>
            <p className="text-[#333] text-[16px] mb-0.5">BL 00 MY ZN</p>
            <p className="text-[#999] text-[12px]">Vehicle Modal Name</p>
          </div>
        </div>

        <div className="border-b border-[#CACACA] my-4"></div>
        <div className="p-8">
          <ProgressSteps currentStep={currentStep} />
        </div>
        <div className="border-b border-[#CACACA] my-4"></div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Progress Bar */}
        <div className="bg-white border border-[#ebebeb] rounded-[10px] p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-3">
          <div className="w-full md:w-[50%]">
            <p className="text-[#333333] text-[14px] font-semibold leading-[120%] align-middle mb-1.25">
              Progress
            </p>
            <div className="w-full h-2 bg-[#f5f5f5] rounded-full ">
              <div
                className="h-full bg-linear-to-r from-[#7CE000] to-[#03A800] rounded-full"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 w-full md:w-auto">
            <Button variant="outline">Cancel</Button>
            <Button
              variant="gradient"
              gradient={{ from: "#ff4f31", to: "#fe2b73" }}
              onClick={handleSaveAndContinue}
              disabled={currentStep === 6}
            >
              {currentStep === 6 ? "Submit" : "Save & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityCheckInspection;
