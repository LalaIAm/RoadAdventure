import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, RotateCw } from "lucide-react";

interface TripTypeStepProps {
  onNext?: () => void;
  onBack?: () => void;
  selectedType?: "one-way" | "round-trip";
  onTypeChange?: (type: "one-way" | "round-trip") => void;
}

const TripTypeStep = ({
  onNext = () => {},
  onBack = () => {},
  selectedType = "one-way",
  onTypeChange = () => {},
}: TripTypeStepProps) => {
  return (
    <div className="w-full min-h-[200px] bg-background p-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Trip Type</h2>

        <RadioGroup
          defaultValue={selectedType}
          onValueChange={(value) =>
            onTypeChange(value as "one-way" | "round-trip")
          }
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem value="one-way" id="one-way" className="mt-1" />
            <div className="flex-1">
              <Label
                htmlFor="one-way"
                className="flex items-center gap-2 text-lg font-medium cursor-pointer"
              >
                <Plane className="h-5 w-5" />
                One-way Trip
              </Label>
              <p className="text-muted-foreground mt-1">
                Perfect for relocations or single destination journeys
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem
              value="round-trip"
              id="round-trip"
              className="mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="round-trip"
                className="flex items-center gap-2 text-lg font-medium cursor-pointer"
              >
                <RotateCw className="h-5 w-5" />
                Round Trip
              </Label>
              <p className="text-muted-foreground mt-1">
                Return to your starting point after your journey
              </p>
            </div>
          </div>
        </RadioGroup>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};

export default TripTypeStep;
