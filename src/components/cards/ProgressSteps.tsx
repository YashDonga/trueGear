import { Truck, Armchair, Gauge, ClipboardList, Camera, CheckSquare } from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: React.ElementType;
}

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps: Step[] = [
    { id: 1, label: "Exterior", icon: Truck },
    { id: 2, label: "Interior", icon: Armchair },
    { id: 3, label: "Brake", icon: Gauge },
    { id: 4, label: "Findings", icon: ClipboardList },
    { id: 5, label: "Photos", icon: Camera },
    { id: 6, label: "Submit", icon: CheckSquare },
  ];

  return (
    <div className="w-full">
      {/* Mobile: Vertical Stepper */}
      <div className="md:hidden relative">
        {/* Vertical Progress Line */}
        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gray-300" />

        <div className="flex flex-col space-y-0">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div
                key={step.id}
                className="relative flex items-center py-2"
              >
                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-lg transition-all shrink-0
                  ${
                    isActive
                      ? "bg-linear-to-r from-[#FF4F31] to-[#FE2B73] text-white shadow-lg"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-[#FBFBFB] border-[#BFBFBF] border rounded-[10px] text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Label */}
                <p
                  className={`ml-4 text-sm font-medium
                  ${
                    isActive || isCompleted
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Horizontal Stepper */}
      <div className="hidden md:block w-full relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300" />

        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div
                key={step.id}
                className={`relative z-10 flex flex-col
                  ${
                    index === 0
                      ? "items-start"
                      : index === steps.length - 1
                      ? "items-end"
                      : "items-center"
                  }`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-linear-to-r from-[#FF4F31] to-[#FE2B73] text-white shadow-lg"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-[#FBFBFB] border-[#BFBFBF] border rounded-[10px] text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-sm font-medium whitespace-nowrap
                  ${
                    isActive || isCompleted
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

