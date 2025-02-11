import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import TripGrid from "../components/dashboard/TripGrid";

interface DashboardProps {
  onNavigate?: (path: string) => void;
  activePath?: string;
}

const Dashboard = ({
  onNavigate = () => {},
  activePath = "/dashboard",
}: DashboardProps) => {
  const handleSort = (value: string) => {
    console.log("Sorting by:", value);
  };

  const handleFilter = (value: string) => {
    console.log("Filtering by:", value);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        onNavigate={onNavigate}
        activePath={activePath}
        className="flex-shrink-0"
      />
      <main className="flex-1 overflow-auto">
        <TripGrid onSort={handleSort} onFilter={handleFilter} />
      </main>
    </div>
  );
};

export default Dashboard;
