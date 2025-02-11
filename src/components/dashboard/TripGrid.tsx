import React from "react";
import TripCard from "./TripCard";
import TripControls from "./TripControls";

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  imageUrl: string;
}

interface TripGridProps {
  trips?: Trip[];
  onSort?: (value: string) => void;
  onFilter?: (value: string) => void;
}

const defaultTrips: Trip[] = [
  {
    id: "1",
    destination: "Paris, France",
    startDate: "2024-06-01",
    endDate: "2024-06-07",
    status: "upcoming",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    destination: "Tokyo, Japan",
    startDate: "2024-07-15",
    endDate: "2024-07-25",
    status: "upcoming",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    destination: "New York, USA",
    startDate: "2024-05-01",
    endDate: "2024-05-05",
    status: "completed",
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
  },
];

const TripGrid = ({
  trips = defaultTrips,
  onSort = () => {},
  onFilter = () => {},
}: TripGridProps) => {
  const [sortValue, setSortValue] = React.useState("date");
  const [filterValue, setFilterValue] = React.useState("all");

  const handleSort = (value: string) => {
    setSortValue(value);
    onSort(value);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <TripControls
        onSort={handleSort}
        onFilter={handleFilter}
        sortValue={sortValue}
        filterValue={filterValue}
      />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              destination={trip.destination}
              startDate={trip.startDate}
              endDate={trip.endDate}
              status={trip.status}
              imageUrl={trip.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripGrid;
