
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoIcon, MapPin, Truck, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  // In a real app, this would come from an API
  const hasAssignedLoad = true;
  const loadData = {
    id: "LD-10234",
    status: "assigned", // assigned, in_transit, delivered
    pickupAddress: "123 Warehouse St, Phoenix, AZ",
    pickupTime: "2025-04-10T10:00:00",
    deliveryAddress: "456 Distribution Ave, Las Vegas, NV",
    deliveryTime: "2025-04-10T18:00:00",
    cargoType: "Furniture",
    weight: "2,500 lbs",
    assignedTruck: "T-78945",
    truckType: "Box Truck",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Agent Driver Dashboard</h1>
        <Badge variant={hasAssignedLoad ? "secondary" : "outline"}>
          {hasAssignedLoad ? "Load Assigned" : "No Active Loads"}
        </Badge>
      </div>
      
      {!hasAssignedLoad ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No assigned load</AlertTitle>
          <AlertDescription>
            You don't have any active load assignments. Please wait for your transport agency to assign you a load.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Assignment</span>
                <Badge>{loadData.status === "assigned" ? "Ready for Pickup" : loadData.status === "in_transit" ? "In Transit" : "Delivered"}</Badge>
              </CardTitle>
              <CardDescription>Load ID: {loadData.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-muted-foreground">{loadData.pickupAddress}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(loadData.pickupTime).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-muted-foreground">{loadData.deliveryAddress}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(loadData.deliveryTime).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cargo Type:</span>
                  <span>{loadData.cargoType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>{loadData.weight}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 rounded-md border p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    <span>Assigned Truck:</span>
                  </span>
                  <Badge variant="outline">{loadData.assignedTruck}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Truck Type:</span>
                  <span>{loadData.truckType}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to="/agent/assigned-load">View Details</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/agent/navigation">Start Navigation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access important information quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start" size="sm">
                <Link to="/agent/pickup-drop">
                  <MapPin className="mr-2 h-4 w-4" />
                  Pickup & Drop Info
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" size="sm">
                <Link to="/agent/contact">
                  <InfoIcon className="mr-2 h-4 w-4" />
                  Contact Details
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" size="sm">
                <Link to="/agent/notifications">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Check Notifications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
