import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

interface TripCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  imageUrl: string;
}

const TripCard = ({
  destination = "Paris, France",
  startDate = "2024-06-01",
  endDate = "2024-06-07",
  status = "upcoming",
  imageUrl = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
}: TripCardProps) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-[384px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-[160px] w-full">
          <img
            src={imageUrl}
            alt={destination}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-4 right-4 ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{destination}</h3>
        </div>
        <div className="mt-4 flex items-center text-gray-600">
          <CalendarDays className="h-5 w-5 mr-2" />
          <span>
            {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{destination}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex justify-between items-center w-full">
          <button
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => console.log("View details clicked")}
          >
            View Details
          </button>
          <button
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => console.log("Edit clicked")}
          >
            Edit
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
