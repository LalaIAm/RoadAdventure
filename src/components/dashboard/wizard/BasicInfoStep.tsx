import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

interface BasicInfoFormData {
  tripName: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

interface BasicInfoStepProps {
  onSubmit?: (data: BasicInfoFormData) => void;
  initialData?: BasicInfoFormData;
}

const BasicInfoStep = ({
  onSubmit = () => {},
  initialData = {
    tripName: "My Awesome Trip",
    dateRange: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  },
}: BasicInfoStepProps) => {
  const { register, handleSubmit } = useForm<BasicInfoFormData>({
    defaultValues: initialData,
  });

  return (
    <Card className="w-full p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tripName">Trip Name</Label>
          <Input
            id="tripName"
            placeholder="Enter your trip name"
            {...register("tripName")}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Trip Dates</Label>
          <DatePickerWithRange
            className="w-full"
            defaultValue={{
              from: initialData.dateRange.from,
              to: initialData.dateRange.to,
            }}
          />
        </div>
      </form>
    </Card>
  );
};

export default BasicInfoStep;
