
import { 
  Truck, 
  Navigation, 
  MapPin, 
  Phone, 
  Bell, 
  Settings, 
  Home 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export const AgentDriverSidebar = () => {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-3.5">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="font-semibold">Cargo Flow</span>
            <span className="text-xs text-sidebar-foreground/70">Agent Driver Portal</span>
          </div>
        </div>
      </div>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard" isActive={window.location.pathname === "/agent"}>
              <Link to="/agent">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Assigned Load" isActive={window.location.pathname === "/agent/assigned-load"}>
              <Link to="/agent/assigned-load">
                <Truck className="h-4 w-4" />
                <span>Assigned Load</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Navigation" isActive={window.location.pathname === "/agent/navigation"}>
              <Link to="/agent/navigation">
                <Navigation className="h-4 w-4" />
                <span>Navigation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Pickup & Drop Info" isActive={window.location.pathname === "/agent/pickup-drop"}>
              <Link to="/agent/pickup-drop">
                <MapPin className="h-4 w-4" />
                <span>Pickup & Drop Info</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Contact Details" isActive={window.location.pathname === "/agent/contact"}>
              <Link to="/agent/contact">
                <Phone className="h-4 w-4" />
                <span>Contact Details</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Notifications" isActive={window.location.pathname === "/agent/notifications"}>
              <Link to="/agent/notifications">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" isActive={window.location.pathname === "/agent/settings"}>
              <Link to="/agent/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="flex flex-col space-y-1 rounded-md bg-sidebar-muted p-3 text-xs">
          <div className="font-semibold">Agent Support</div>
          <div className="text-sidebar-foreground/70">Call: 1-800-CARGO-HELP</div>
          <div className="text-sidebar-foreground/70">Report issues anytime</div>
        </div>
      </div>
    </div>
  );
};

export default AgentDriverSidebar;
