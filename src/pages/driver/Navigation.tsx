
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Navigation as NavigationIcon } from "lucide-react";
import HereMap from "@/components/maps/HereMap";
import { createMarker } from "@/utils/hereMapUtils";
import { useToast } from "@/components/ui/use-toast";

// API Key for HERE Maps
const HERE_MAPS_API_KEY = 'mMnz8xcmPSe0YsqfH0N9p3clRDzC81kbJBCkQl5QReU';

const Navigation: React.FC = () => {
  const { toast } = useToast();
  const [map, setMap] = useState<H.map.Map | null>(null);
  const [center, setCenter] = useState({
    lat: 37.7749,
    lng: -122.4194 // Default to San Francisco
  });
  
  // Currently active job (could be fetched from context or API)
  const activeJob = {
    pickup: { 
      name: "Amazon Distribution Center", 
      location: "Phoenix, AZ", 
      lat: 33.4484, 
      lng: -112.0740 
    },
    delivery: { 
      name: "Walmart Supercenter", 
      location: "Tempe, AZ", 
      lat: 33.4144, 
      lng: -111.9094 
    }
  };

  // Initialize the map
  const handleMapReady = (mapInstance: H.map.Map) => {
    setMap(mapInstance);
    
    // Add marker for pickup
    const pickupMarker = createMarker({ lat: activeJob.pickup.lat, lng: activeJob.pickup.lng });
    mapInstance.addObject(pickupMarker);
    
    // Add marker for delivery
    const deliveryMarker = createMarker({ lat: activeJob.delivery.lat, lng: activeJob.delivery.lng });
    mapInstance.addObject(deliveryMarker);
    
    // Center the map between pickup and delivery
    const centerLat = (activeJob.pickup.lat + activeJob.delivery.lat) / 2;
    const centerLng = (activeJob.pickup.lng + activeJob.delivery.lng) / 2;
    setCenter({ lat: centerLat, lng: centerLng });
    mapInstance.setCenter({ lat: centerLat, lng: centerLng });
    
    // Calculate appropriate zoom level to see both points
    if (window.H) {
      // Simple approach without using H.math.Box since it may not be available
      const latDiff = Math.abs(activeJob.pickup.lat - activeJob.delivery.lat);
      const lngDiff = Math.abs(activeJob.pickup.lng - activeJob.delivery.lng);
      
      // Determine zoom based on distance
      const maxDiff = Math.max(latDiff, lngDiff);
      let zoom = 12;
      
      if (maxDiff > 0.5) zoom = 9;
      else if (maxDiff > 0.2) zoom = 10;
      else if (maxDiff > 0.05) zoom = 11;
      
      mapInstance.setZoom(zoom);
    } else {
      // Fallback to simple zoom if H is not available
      mapInstance.setZoom(10);
    }
    
    toast({
      title: "Navigation active",
      description: "Route to destination displayed",
    });
  };

  // Navigate to pickup location
  const navigateToPickup = () => {
    if (map) {
      setCenter({ lat: activeJob.pickup.lat, lng: activeJob.pickup.lng });
      map.setCenter({ lat: activeJob.pickup.lat, lng: activeJob.pickup.lng });
      map.setZoom(15);
      
      toast({
        title: "Navigating to pickup",
        description: `Directions to ${activeJob.pickup.name}`,
      });
    }
  };

  // Navigate to delivery location
  const navigateToDelivery = () => {
    if (map) {
      setCenter({ lat: activeJob.delivery.lat, lng: activeJob.delivery.lng });
      map.setCenter({ lat: activeJob.delivery.lat, lng: activeJob.delivery.lng });
      map.setZoom(15);
      
      toast({
        title: "Navigating to delivery",
        description: `Directions to ${activeJob.delivery.name}`,
      });
    }
  };

  // Get current user location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Getting location",
        description: "Fetching your current location...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          if (map) {
            setCenter({ lat: latitude, lng: longitude });
            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15);
          }
          
          toast({
            title: "Location found",
            description: "Map centered on your current location",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to retrieve your location",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Navigation</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Controls */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <NavigationIcon className="mr-2 h-5 w-5" />
                <span>Current Job</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activeJob.pickup.name}</p>
                    <p className="text-sm text-muted-foreground">{activeJob.pickup.location}</p>
                  </div>
                </div>
                
                <div className="ml-4 border-l-2 border-dashed border-muted h-6"></div>
                
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activeJob.delivery.name}</p>
                    <p className="text-sm text-muted-foreground">{activeJob.delivery.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" onClick={navigateToPickup}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Navigate to Pickup
                </Button>
                <Button className="w-full" onClick={navigateToDelivery}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Navigate to Delivery
                </Button>
                <Button className="w-full" variant="outline" onClick={getCurrentLocation}>
                  <Truck className="mr-2 h-4 w-4" />
                  My Current Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Map container */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <HereMap
                apiKey={HERE_MAPS_API_KEY}
                center={center}
                zoom={12}
                className="h-[600px] w-full"
                onMapReady={handleMapReady}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
