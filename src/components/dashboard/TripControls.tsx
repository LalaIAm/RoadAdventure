import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar, Filter, SortAsc } from "lucide-react";

interface TripControlsProps {
  onSort?: (value: string) => void;
  onFilter?: (value: string) => void;
  sortValue?: string;
  filterValue?: string;
}

const TripControls = ({
  onSort = () => {},
  onFilter = () => {},
  sortValue = "date",
  filterValue = "all",
}: TripControlsProps) => {
  return (
    <div className="w-full bg-white border-b p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Select value={sortValue} onValueChange={onSort}>
          <SelectTrigger className="w-[180px]">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </div>
            </SelectItem>
            <SelectItem value="destination">Destination</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterValue} onValueChange={onFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trips</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Grid View
        </Button>
        <Button variant="outline" size="sm">
          List View
        </Button>
      </div>
    </div>
  );
};

export default TripControls;
