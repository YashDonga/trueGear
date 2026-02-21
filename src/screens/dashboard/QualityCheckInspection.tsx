import { useState } from "react";
import truck from "../../assets/truck.png";
import { InspectionSection } from "../../components/cards/InspectionSection";
import ProgressSteps from "../../components/cards/ProgressSteps";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { FindingsSection } from "../../components/cards/FindingsSection";
import { FailedItemSection } from "../../components/cards/FailedItemSection";
import { BreakTestSummary } from "../../components/cards/BreakTestSummary";
import { CriticalAlert } from "../../components/cards/CriticalAlert";
import QCRatingSection from "../../components/cards/QCRatingSection";
import QCRemarkSection from "../../components/cards/QCRemarkSection";
import QCSuccess from "../../components/cards/QCSuccess";

// Type for checklist item status
type ChecklistStatus = "pass" | "fail" | "na" | null;

// Type for step validation errors
interface ValidationErrors {
  [key: string]: string;
}

const QualityCheckInspection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // State for Step 1 (Exterior) - Body & Paint
  const [bodyPaintStatus, setBodyPaintStatus] = useState<
    Record<number, ChecklistStatus>
  >({});

  // State for Step 2 (Interior) - Seats & Upholstery
  const [seatsStatus, setSeatsStatus] = useState<
    Record<number, ChecklistStatus>
  >({});

  // State for Step 3 (Brake)
  const [brakeStatus, setBrakeStatus] = useState<
    Record<number, ChecklistStatus>
  >({});

  // State for Step 4 (Findings)
  const [qcRating, setQcrating] = useState<string>("");

  // Validation functions for each step
  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    switch (step) {
      case 1: // Exterior - All items must have status
        // Body & Paint (6 items)
        for (let i = 0; i < 6; i++) {
          if (!bodyPaintStatus[i]) {
            newErrors["bodyPaint"] = "Please complete all Body & Paint items";
            isValid = false;
            break;
          }
        }
        break;

      case 2: // Interior - All items must have status
        // Seats & Upholstery (6 items)
        for (let i = 0; i < 6; i++) {
          if (!seatsStatus[i]) {
            newErrors["seats"] = "Please complete all Seats & Upholstery items";
            isValid = false;
            break;
          }
        }
        break;

      case 3: // Brake - All items must have status (4 items)
        for (let i = 0; i < 4; i++) {
          if (!brakeStatus[i]) {
            newErrors["brake"] = "Please complete all Brake items";
            isValid = false;
            break;
          }
        }
        break;

      case 4: // Findings - QC Rating must be selected
        if (!qcRating) {
          newErrors["qcRating"] = "Please select a QC status rating";
          isValid = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveAndContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
        // Clear errors when moving to next step
        setErrors({});
      }
    }
  };

  const bodyPaintItems = [
    {
      label: "Body Panels Condition",
    },
    { label: "Paint condition & scratches" },
    { label: "Windshield & windows" },
    { label: "Headlights & tail lights" },
    { label: "Tyres & wheel condition" },
    { label: "Side mirrors" },
  ];


  const seatupholstryItems = [
    { label: "Dashboard condition" },
    { label: "Seat condition" },
    { label: "AC vents & controls" },
    { label: "Steering & gear lever" },
    { label: "Infotainment system" },
    { label: "Engine bay inspection" },
  ];
  const BreakItems = [
    { label: "Brake pedal response" },
    { label: "Handbrake function" },
    { label: "Brake fluid level" },
    { label: "Brake pad wear" },
  ];

  // Render error message if exists
  const renderError = (errorKey: string) => {
    if (errors[errorKey]) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {errors[errorKey]}
        </div>
      );
    }
    return null;
  };

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
            {renderError("bodyPaint")}
            <InspectionSection
              title="Body & Paint"
              description="Scratches, Cracks or impact inspection"
              progress="0/6"
              items={bodyPaintItems}
              status={bodyPaintStatus}
              onStatusChange={setBodyPaintStatus}
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
            {renderError("seats")}
            <InspectionSection
              title="Seats & Upholstery"
              description="Vehicles awaiting quality inspection"
              progress="0/4"
              items={seatupholstryItems}
              status={seatsStatus}
              onStatusChange={setSeatsStatus}
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
            {renderError("brake")}
            <InspectionSection
              title="Brake System"
              description="Brake system inspection"
              progress="0/4"
              items={BreakItems}
              status={brakeStatus}
              onStatusChange={setBrakeStatus}
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
            {renderError("qcRating")}
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
              value={qcRating}
              onChange={setQcrating}
            />
            <QCRemarkSection
              title="Final Remarks"
              description="Rate overall brake performance"
            />
          </>
        );
      case 5: // Submit
        return (
          <>
            <QCSuccess />
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
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
          {/* Action Buttons */}
          {currentStep !== 5 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 w-full md:w-auto">
              <Button variant="outline">Cancel</Button>
              <Button
                variant="gradient"
                gradient={{ from: "#ff4f31", to: "#fe2b73" }}
                onClick={handleSaveAndContinue}
                disabled={currentStep === 5}
              >
                {currentStep === 5 ? "Submit" : "Save & Continue"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QualityCheckInspection;
