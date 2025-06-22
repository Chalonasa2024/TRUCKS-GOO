
import { useState } from "react";
import { Menu, Bell, X, MapPin, User, Calendar, Search, Truck, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthMenu } from "@/components/auth/AuthMenu";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

interface MobileHeaderProps {
  toggleSidebar: () => void;
  userRole: "company" | "driver" | "transport_agency" | "agent_driver";
}

export const MobileHeader = ({ toggleSidebar, userRole }: MobileHeaderProps) => {
  const [searchVisible, setSearchVisible] = useState(false);

  // Quick action links based on user role
  const quickActions = userRole === "company" 
    ? [
        { name: "Post Load", icon: <Truck className="h-4 w-4" />, path: "/post-load" },
        { name: "Requests", icon: <Calendar className="h-4 w-4" />, path: "/load-requests" }
      ]
    : userRole === "driver"
    ? [
        { name: "Find Loads", icon: <Search className="h-4 w-4" />, path: "/driver/loads" },
        { name: "My Bookings", icon: <Truck className="h-4 w-4" />, path: "/driver/bookings" }
      ]
    : userRole === "transport_agency"
    ? [
        { name: "My Trucks", icon: <Truck className="h-4 w-4" />, path: "/transport/trucks" },
        { name: "Find Loads", icon: <Search className="h-4 w-4" />, path: "/transport/loads" }
      ]
    : [
        { name: "Assigned Load", icon: <Truck className="h-4 w-4" />, path: "/agent/assigned-load" },
        { name: "Navigation", icon: <Navigation className="h-4 w-4" />, path: "/agent/navigation" }
      ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        
        {!searchVisible && (
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">
              Cargo Flow
            </h1>
            <Badge variant="outline" className="ml-2">
              {userRole === "company" ? "Company" : userRole === "driver" ? "Driver" : userRole === "transport_agency" ? "Transport" : "Agent Driver"}
            </Badge>
          </div>
        )}
        
        {searchVisible && (
          <div className="absolute left-0 right-0 flex items-center px-4 animate-fade-in">
            <Input 
              placeholder="Search..." 
              className="h-9 pl-8"
              autoFocus
            />
            <Search className="absolute left-7 h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="icon" onClick={() => setSearchVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {!searchVisible && (
          <>
            <Button variant="ghost" size="icon" onClick={() => setSearchVisible(true)}>
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">
                    3
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-md border p-3 hover:bg-muted/50">
                        <div className="flex justify-between text-sm font-medium">
                          <span>New {userRole === "company" 
                            ? "driver request" 
                            : userRole === "driver" 
                            ? "load available" 
                            : userRole === "transport_agency"
                            ? "shipment request"
                            : "load assignment"}</span>
                          <span className="text-muted-foreground">{i}h ago</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {userRole === "company" 
                            ? `Driver John D. has requested to carry your load #10${i}` 
                            : userRole === "driver"
                            ? `New load available in Phoenix, AZ - ${i}0,000 lbs`
                            : userRole === "transport_agency"
                            ? `Company XYZ requested your truck for shipment #10${i}`
                            : `You've been assigned to load #10${i} - Pickup at Phoenix, AZ`}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">View All</Button>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
        
        {/* Quick Action Buttons */}
        <div className="hidden sm:flex sm:items-center sm:gap-1">
          {quickActions.map((action) => (
            <Button key={action.name} variant="ghost" size="sm" asChild className="text-xs">
              <Link to={action.path}>
                {action.icon}
                <span className="ml-1">{action.name}</span>
              </Link>
            </Button>
          ))}
        </div>
        
        <AuthMenu />
      </div>
    </header>
  );
};
