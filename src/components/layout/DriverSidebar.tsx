
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Package, 
  Check,
  Bell, 
  MessageSquare,
  Download, 
  FileText,
  Settings, 
  Compass,
  Truck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";

export const DriverSidebar = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(true);
  const isMobile = useIsMobile();
  
  const navLinks = [
    { name: "Dashboard", path: "/driver", icon: Home },
    { name: "Available Loads", path: "/driver/loads", icon: Package },
    { name: "My Bookings", path: "/driver/bookings", icon: Check },
    { name: "Navigation", path: "/driver/navigation", icon: Compass },
    { name: "Notifications", path: "/driver/notifications", icon: Bell },
    { name: "Messages", path: "/driver/messages", icon: MessageSquare },
    { name: "Earnings", path: "/driver/earnings", icon: Download },
    { name: "Documents", path: "/driver/documents", icon: FileText },
    { name: "Settings", path: "/driver/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-[#111827] text-white">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0284c7]">
          <Truck className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Cargo Flow</h1>
          <p className="text-xs text-white/70">Driver Portal</p>
        </div>
      </div>

      {/* Driver Status */}
      <div className="mx-4 mb-4 rounded-lg bg-[#1e293b] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-white/90">Driver Status</span>
          <span className={`flex h-2 w-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-500"}`}></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Online</span>
          <Switch 
            checked={isOnline} 
            onCheckedChange={() => setIsOnline(!isOnline)}
            className="data-[state=checked]:bg-[#0284c7] data-[state=unchecked]:bg-[#334155]" 
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive 
                    ? "bg-[#F97316] text-white font-medium" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="flex-1">{link.name}</span>
                {isMobile && <ChevronRight className="h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="mt-auto border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <div className="flex h-full w-full items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
              JD
            </div>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-white/70 truncate">driver@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSidebar;
