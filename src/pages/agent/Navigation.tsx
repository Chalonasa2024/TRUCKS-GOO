
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Navigation as NavigationIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const Navigation = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // In a real app, these would come from an API
  const pickupLocation = "123 Warehouse St, Phoenix, AZ 85001";
  const deliveryLocation = "456 Distribution Ave, Las Vegas, NV 89101";
  const estimatedDistance = "298";
  const estimatedDuration = "4.5";
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Navigation</h1>
      </div>
      
      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Please note</AlertTitle>
        <AlertDescription>
          This is a simplified navigation view. In a real application, this would integrate with mapping services like Google Maps, Mapbox, or similar.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
            <CardDescription>Pickup to delivery route</CardDescription>
          </CardHeader>
          <CardContent>
            {/* This is a placeholder for a real map integration */}
            <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center">
              <div className="text-center space-y-2">
                <NavigationIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Map would display here with route from Phoenix to Las Vegas
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                View Pickup Location
              </Button>
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                View Delivery Location
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Route Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium">Distance</div>
                <div className="text-2xl font-bold">{estimatedDistance} miles</div>
              </div>
              <div>
                <div className="text-sm font-medium">Estimated Time</div>
                <div className="text-2xl font-bold">{estimatedDuration} hours</div>
              </div>
              <Button variant="secondary" className="w-full">
                Start Navigation
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Pickup</span>
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  {pickupLocation}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Delivery</span>
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  {deliveryLocation}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
