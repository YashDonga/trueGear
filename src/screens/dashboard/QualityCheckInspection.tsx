import truck from "../../assets/truck.png";
import { InspectionSection } from "../../components/cards/InspectionSection";
import ProgressSteps from "../../components/cards/ProgressSteps";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";

const QualityCheckInspection: React.FC = () => {
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
          <ProgressSteps currentStep={1} />
        </div>
        <div className="border-b border-[#CACACA] my-4"></div>

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

        {/* Progress Bar */}
        <div className="bg-white border border-[#ebebeb] rounded-[10px] p-5 mb-5 flex items-center justify-between gap-3">
          <div className="w-[50%]">
            <p className="text-[#333333] text-[14px] font-semibold leading-[120%] align-middle mb-1.25">
              Progress
            </p>
            <div className="w-full h-2 bg-[#f5f5f5] rounded-full ">
              <div
                className="h-full bg-linear-to-r from-[#7CE000] to-[#03A800] rounded-full"
                style={{ width: "50%" }}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button
              variant="gradient"
              gradient={{ from: "#ff4f31", to: "#fe2b73" }}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityCheckInspection;
