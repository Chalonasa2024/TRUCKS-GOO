
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Truck, 
  Package, 
  Bell, 
  MessageSquare,
  FileText, 
  Settings, 
  PlusCircle,
  ClipboardList,
  Map
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthMenu } from "@/components/auth/AuthMenu";
import { useAuth } from "@/contexts/AuthContext";

export const CompanySidebar = () => {
  const location = useLocation();
  const { userEmail } = useAuth();
  
  const navLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Find Trucks", path: "/trucks", icon: Truck },
    { name: "Post Load", path: "/post-load", icon: PlusCircle },
    { name: "Load Requests", path: "/load-requests", icon: ClipboardList },
    { name: "Live Tracking", path: "/live-tracking", icon: Map },
    { name: "Shipments", path: "/shipments", icon: Package },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Truck className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Cargo Flow</h1>
          <p className="text-xs text-white/70">Company Portal</p>
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
                  "nav-link",
                  isActive && "nav-link-active"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-sidebar-foreground">Company Account</p>
            <p className="text-xs text-sidebar-foreground/70">{userEmail || "admin@acme.com"}</p>
          </div>
          <AuthMenu />
        </div>
      </div>
    </div>
  );
};
