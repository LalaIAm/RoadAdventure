import React from "react";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface WizardProgressProps {
  steps?: Step[];
  currentStep?: number;
  onStepClick?: (stepId: number) => void;
}

const defaultSteps: Step[] = [
  { id: 1, title: "Basic Info", completed: false },
  { id: 2, title: "Location", completed: false },
  { id: 3, title: "Trip Type", completed: false },
  { id: 4, title: "Preferences", completed: false },
];

const WizardProgress = ({
  steps = defaultSteps,
  currentStep = 1,
  onStepClick = () => {},
}: WizardProgressProps) => {
  return (
    <div className="w-full bg-white p-4 border-b">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10" />

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <Button
                variant={
                  step.completed
                    ? "default"
                    : currentStep === step.id
                      ? "secondary"
                      : "outline"
                }
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => onStepClick(step.id)}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </Button>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardProgress;
