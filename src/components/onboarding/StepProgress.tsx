
import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-10 rounded-full transition-colors duration-300 ${
            i + 1 <= currentStep ? "bg-primary" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgress;
