import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  MapPin,
  Package,
  Calendar,
  Clock,
  Info,
  Navigation,
  Phone,
  AlertCircle
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const AssignedLoad = () => {
  const [loadStatus, setLoadStatus] = useState<"assigned" | "in_transit" | "delivered">("assigned");
  
  // In a real app, this would come from an API
  const loadData = {
    id: "LD-10234",
    status: loadStatus,
    pickupAddress: "123 Warehouse St, Phoenix, AZ 85001",
    pickupTime: "2025-04-10T10:00:00",
    pickupContact: "John Smith",
    pickupPhone: "(555) 123-4567",
    deliveryAddress: "456 Distribution Ave, Las Vegas, NV 89101",
    deliveryTime: "2025-04-10T18:00:00",
    deliveryContact: "Jane Doe",
    deliveryPhone: "(555) 987-6543",
    cargoType: "Furniture",
    cargoDescription: "Living room set: couch, chairs, tables",
    weight: "2,500 lbs",
    dimensions: "8ft x 6ft x 7ft",
    specialInstructions: "Fragile items, handle with care. Requires lift gate for unloading.",
    assignedTruck: "T-78945",
    truckType: "Box Truck",
  };

  // In a real app, this would call an API
  const updateLoadStatus = (newStatus: "assigned" | "in_transit" | "delivered") => {
    setLoadStatus(newStatus);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Assigned Load</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={
            loadStatus === "assigned" 
              ? "outline" 
              : loadStatus === "in_transit" 
                ? "secondary" 
                : "default"
          } className="h-6">
            {loadStatus === "assigned" 
              ? "Ready for Pickup" 
              : loadStatus === "in_transit" 
                ? "In Transit" 
                : "Delivered"}
          </Badge>
          <span className="text-sm text-muted-foreground">ID: {loadData.id}</span>
        </div>
      </div>
      
      {/* Status update buttons */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Load Status</CardTitle>
          <CardDescription>Update the status of your delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={loadStatus === "assigned" ? "default" : "outline"}
              size="sm"
              onClick={() => updateLoadStatus("assigned")}
              disabled={loadStatus !== "assigned"}
            >
              Ready for Pickup
            </Button>
            <Button
              variant={loadStatus === "in_transit" ? "default" : "outline"}
              size="sm"
              onClick={() => updateLoadStatus("in_transit")}
              disabled={!(loadStatus === "assigned" || loadStatus === "in_transit")}
            >
              Start Transit
            </Button>
            <Button
              variant={loadStatus === "delivered" ? "default" : "outline"}
              size="sm"
              onClick={() => updateLoadStatus("delivered")}
              disabled={!(loadStatus === "in_transit" || loadStatus === "delivered")}
            >
              Mark Delivered
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Load Details</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="truck">Truck Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cargo Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cargo Type:</span>
                  </div>
                  <span className="text-sm">{loadData.cargoType}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Description:</span>
                  </div>
                  <span className="text-sm max-w-[60%] text-right">{loadData.cargoDescription}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Weight:</span>
                  </div>
                  <span className="text-sm">{loadData.weight}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Dimensions:</span>
                  </div>
                  <span className="text-sm">{loadData.dimensions}</span>
                </div>
                
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">Special Instructions:</span>
                  </div>
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-2 text-sm text-amber-900">
                    {loadData.specialInstructions}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link to="/agent/navigation">
                <Navigation className="mr-2 h-4 w-4" />
                Start Navigation
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/agent/contact">
                <Phone className="mr-2 h-4 w-4" />
                View Contacts
              </Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pickup Location</CardTitle>
              <CardDescription>{loadData.pickupAddress}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                  </div>
                  <span className="text-sm">
                    {new Date(loadData.pickupTime).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Time:</span>
                  </div>
                  <span className="text-sm">
                    {new Date(loadData.pickupTime).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Contact:</span>
                  </div>
                  <span className="text-sm">{loadData.pickupContact}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                  </div>
                  <span className="text-sm">{loadData.pickupPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Delivery Location</CardTitle>
              <CardDescription>{loadData.deliveryAddress}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                  </div>
                  <span className="text-sm">
                    {new Date(loadData.deliveryTime).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Time:</span>
                  </div>
                  <span className="text-sm">
                    {new Date(loadData.deliveryTime).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Contact:</span>
                  </div>
                  <span className="text-sm">{loadData.deliveryContact}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                  </div>
                  <span className="text-sm">{loadData.deliveryPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="truck">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Truck</CardTitle>
              <CardDescription>Your truck for this load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium">{loadData.assignedTruck}</span>
                </div>
                <Badge variant="outline">{loadData.truckType}</Badge>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{loadData.truckType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium">3,000 lbs</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Dimensions</p>
                    <p className="font-medium">16ft x 8ft x 8ft</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">Diesel</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignedLoad;
