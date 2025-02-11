import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Home,
  PlusCircle,
  Compass,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  className?: string;
  onNavigate?: (path: string) => void;
  activePath?: string;
}

const Sidebar = ({
  className = "",
  onNavigate = () => {},
  activePath = "/dashboard",
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: PlusCircle, label: "Create Trip", path: "/create-trip" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Users, label: "Social", path: "/social" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-cyan-400 to-teal-800 border-r transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-white">TravelApp</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 mt-6 px-2">
        <TooltipProvider>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePath === item.path ? "default" : "ghost"}
                    className={cn(
                      "w-full flex items-center",
                      activePath === item.path
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                      isCollapsed ? "justify-center" : "justify-start",
                    )}
                    onClick={() => onNavigate(item.path)}
                  >
                    <item.icon
                      className={cn("h-5 w-5", !isCollapsed && "mr-3")}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </nav>

      <div className="border-t p-2">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center",
                  "text-white/70 hover:text-white hover:bg-white/10",
                  isCollapsed ? "justify-center" : "justify-start",
                )}
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
