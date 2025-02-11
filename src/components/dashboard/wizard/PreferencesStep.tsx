import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Compass,
  Mountain,
  Building2,
  Star,
  Wallet,
  Users,
} from "lucide-react";

interface PreferencesStepProps {
  onRouteTypeChange?: (value: string) => void;
  onPoiChange?: (value: string[]) => void;
  onTravelStyleChange?: (value: string) => void;
  selectedRouteType?: string;
  selectedPoi?: string[];
  selectedTravelStyle?: string;
}

const PreferencesStep = ({
  onRouteTypeChange = () => {},
  onPoiChange = () => {},
  onTravelStyleChange = () => {},
  selectedRouteType = "fastest",
  selectedPoi = ["landmarks"],
  selectedTravelStyle = "balanced",
}: PreferencesStepProps) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Route Type</h3>
        <RadioGroup
          defaultValue={selectedRouteType}
          onValueChange={onRouteTypeChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="fastest" id="fastest" />
            <Label htmlFor="fastest" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Fastest Route
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="scenic" id="scenic" />
            <Label htmlFor="scenic" className="flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              Scenic Route
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="historical" id="historical" />
            <Label htmlFor="historical" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Historical Route
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Points of Interest</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="landmarks"
              checked={selectedPoi.includes("landmarks")}
              onCheckedChange={(checked) => {
                if (checked) {
                  onPoiChange([...selectedPoi, "landmarks"]);
                } else {
                  onPoiChange(selectedPoi.filter((poi) => poi !== "landmarks"));
                }
              }}
            />
            <Label htmlFor="landmarks">Landmarks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nature"
              checked={selectedPoi.includes("nature")}
              onCheckedChange={(checked) => {
                if (checked) {
                  onPoiChange([...selectedPoi, "nature"]);
                } else {
                  onPoiChange(selectedPoi.filter((poi) => poi !== "nature"));
                }
              }}
            />
            <Label htmlFor="nature">Nature Spots</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="museums"
              checked={selectedPoi.includes("museums")}
              onCheckedChange={(checked) => {
                if (checked) {
                  onPoiChange([...selectedPoi, "museums"]);
                } else {
                  onPoiChange(selectedPoi.filter((poi) => poi !== "museums"));
                }
              }}
            />
            <Label htmlFor="museums">Museums</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Travel Style</h3>
        <RadioGroup
          defaultValue={selectedTravelStyle}
          onValueChange={onTravelStyleChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="luxury" id="luxury" />
            <Label htmlFor="luxury" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Luxury
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="budget" id="budget" />
            <Label htmlFor="budget" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Budget
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-lg">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Family-Friendly
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PreferencesStep;
