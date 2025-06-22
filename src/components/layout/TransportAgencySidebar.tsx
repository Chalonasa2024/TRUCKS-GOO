
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Truck, 
  Package, 
  Bell, 
  MessageSquare,
  FileText, 
  Settings, 
  Map,
  ClipboardList,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthMenu } from "@/components/auth/AuthMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";

export const TransportAgencySidebar = () => {
  const location = useLocation();
  const { userEmail } = useAuth();
  const isMobile = useIsMobile();
  
  const navLinks = [
    { name: "Dashboard", path: "/transport", icon: Home },
    { name: "My Trucks", path: "/transport/trucks", icon: Truck },
    { name: "My Truck Shipments", path: "/transport/shipments", icon: Package },
    { name: "Requests", path: "/transport/requests", icon: ClipboardList },
    { name: "Find Loads", path: "/transport/loads", icon: Search },
    { name: "Live Tracking", path: "/transport/live-tracking", icon: Map },
    { name: "Notifications", path: "/transport/notifications", icon: Bell },
    { name: "Messages", path: "/transport/messages", icon: MessageSquare },
    { name: "Reports", path: "/transport/reports", icon: FileText },
    { name: "Settings", path: "/transport/settings", icon: Settings },
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
          <p className="text-xs text-white/70">Transport Portal</p>
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
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">Transport Agency</p>
            <p className="text-xs text-white/70 truncate">{userEmail || "transport@example.com"}</p>
          </div>
          <AuthMenu />
        </div>
      </div>
    </div>
  );
};

export default TransportAgencySidebar;
