import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import WizardProgress from "./wizard/WizardProgress";
import BasicInfoStep from "./wizard/BasicInfoStep";
import LocationStep from "./wizard/LocationStep";
import TripTypeStep from "./wizard/TripTypeStep";
import PreferencesStep from "./wizard/PreferencesStep";
import { addDays } from "date-fns";

interface NewTripWizardProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (tripData: any) => void;
}

const DRAFT_KEY = "trip-wizard-draft";

const NewTripWizard = ({
  open = true,
  onOpenChange = () => {},
  onComplete = () => {},
}: NewTripWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {
      tripName: "My Awesome Trip",
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
    location: {
      startLocation: "",
      destination: "",
    },
    tripType: "one-way",
    preferences: {
      routeType: "fastest",
      pointsOfInterest: ["landmarks"],
      travelStyle: "balanced",
    },
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData({
          ...parsedDraft,
          basicInfo: {
            ...parsedDraft.basicInfo,
            dateRange: {
              from: new Date(parsedDraft.basicInfo.dateRange.from),
              to: new Date(parsedDraft.basicInfo.dateRange.to),
            },
          },
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your trip details have been saved as a draft.",
    });
  };

  const steps = [
    { id: 1, title: "Basic Info", completed: currentStep > 1 },
    { id: 2, title: "Location", completed: currentStep > 2 },
    { id: 3, title: "Trip Type", completed: currentStep > 3 },
    { id: 4, title: "Preferences", completed: currentStep > 4 },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
      localStorage.removeItem(DRAFT_KEY); // Clear draft when completed
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            initialData={formData.basicInfo}
            onSubmit={(data) => setFormData({ ...formData, basicInfo: data })}
          />
        );
      case 2:
        return (
          <LocationStep
            startLocation={formData.location.startLocation}
            destination={formData.location.destination}
            onStartLocationChange={(location) =>
              setFormData({
                ...formData,
                location: { ...formData.location, startLocation: location },
              })
            }
            onDestinationChange={(location) =>
              setFormData({
                ...formData,
                location: { ...formData.location, destination: location },
              })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <TripTypeStep
            selectedType={formData.tripType as "one-way" | "round-trip"}
            onTypeChange={(type) =>
              setFormData({ ...formData, tripType: type })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <PreferencesStep
            selectedRouteType={formData.preferences.routeType}
            selectedPoi={formData.preferences.pointsOfInterest}
            selectedTravelStyle={formData.preferences.travelStyle}
            onRouteTypeChange={(type) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, routeType: type },
              })
            }
            onPoiChange={(poi) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, pointsOfInterest: poi },
              })
            }
            onTravelStyleChange={(style) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, travelStyle: style },
              })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-background">
        <WizardProgress
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />
        <div className="p-6">{renderStep()}</div>
        {currentStep === 1 && (
          <div className="p-6 border-t flex justify-between">
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={saveDraft}>
                Save as Draft
              </Button>
            </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        )}
        {currentStep === 4 && (
          <div className="p-6 border-t flex justify-between">
            <div className="space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button variant="secondary" onClick={saveDraft}>
                Save as Draft
              </Button>
            </div>
            <Button onClick={handleNext}>Complete</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewTripWizard;
