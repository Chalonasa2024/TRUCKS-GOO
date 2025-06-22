
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CompanySidebar } from "./CompanySidebar";
import { DriverSidebar } from "./DriverSidebar";
import { TransportAgencySidebar } from "./TransportAgencySidebar";
import { AgentDriverSidebar } from "./AgentDriverSidebar";
import { MobileHeader } from "./MobileHeader";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon, X } from "lucide-react";

export const AppLayout = () => {
  const { userRole, isLoggedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Set sidebar open by default on desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderSidebar = () => {
    if (userRole === "company") return <CompanySidebar />;
    if (userRole === "driver") return <DriverSidebar />;
    if (userRole === "transport_agency") return <TransportAgencySidebar />;
    if (userRole === "agent_driver") return <AgentDriverSidebar />;
    return <CompanySidebar />; // Default to CompanySidebar
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Mobile Header - Only visible on small screens */}
        <MobileHeader
          toggleSidebar={toggleSidebar}
          userRole={userRole || "company"}
        />

        {/* Mobile sidebar backdrop - only shown when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 transition-opacity" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Collapsible on mobile */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 bg-sidebar",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile close button */}
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 p-2 text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
          
          {renderSidebar()}
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-x-hidden overflow-y-auto">
          {/* Mobile menu button - fixed position for easier access */}
          {isMobile && !sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed bottom-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg"
            >
              <MenuIcon size={20} />
            </button>
          )}
          
          <div className="container px-4 py-4 md:py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
