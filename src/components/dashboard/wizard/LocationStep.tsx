import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationStepProps {
  startLocation?: string;
  destination?: string;
  onStartLocationChange?: (location: string) => void;
  onDestinationChange?: (location: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const LocationStep = ({
  startLocation = "",
  destination = "",
  onStartLocationChange = () => {},
  onDestinationChange = () => {},
  onNext = () => {},
  onBack = () => {},
}: LocationStepProps) => {
  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Choose Locations</h2>
          <p className="text-muted-foreground">
            Enter your starting point and destination
          </p>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-[200px] bg-muted rounded-lg flex items-center justify-center">
          <MapPin className="w-8 h-8 text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Interactive Map</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startLocation">Starting Point</Label>
            <Input
              id="startLocation"
              placeholder="Enter starting location"
              value={startLocation}
              onChange={(e) => onStartLocationChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </Card>
    </div>
  );
};

export default LocationStep;
