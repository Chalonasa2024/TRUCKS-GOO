
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Navigation, AlertCircle, Clock, MapPin } from "lucide-react";
import HereMap from "@/components/maps/HereMap";
import { useToast } from "@/components/ui/use-toast";

// API Key for HERE Maps
const HERE_MAPS_API_KEY = 'mMnz8xcmPSe0YsqfH0N9p3clRDzC81kbJBCkQl5QReU';

// Mock truck data - in a real app, this would come from an API
const mockTrucks = [
  {
    id: "T-1001",
    driver: "John Doe",
    vehicle: "Freightliner Cascadia",
    status: "On Route",
    eta: "2h 15m",
    position: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    destination: "San Francisco, CA",
    load: {
      id: "L-5432",
      description: "Electronics",
      weight: "12,000 lbs",
      pickup: "Los Angeles, CA",
      delivery: "San Francisco, CA",
    }
  },
  {
    id: "T-1002",
    driver: "Sarah Johnson",
    vehicle: "Kenworth T680",
    status: "Loading",
    eta: "5h 30m",
    position: { lat: 33.4484, lng: -112.0740 }, // Phoenix
    destination: "Las Vegas, NV",
    load: {
      id: "L-5433",
      description: "Construction Materials",
      weight: "24,500 lbs",
      pickup: "Phoenix, AZ",
      delivery: "Las Vegas, NV",
    }
  },
  {
    id: "T-1003",
    driver: "Miguel Sanchez",
    vehicle: "Peterbilt 389",
    status: "Idle",
    eta: "N/A",
    position: { lat: 36.1699, lng: -115.1398 }, // Las Vegas
    destination: "N/A",
    load: {
      id: "N/A",
      description: "N/A",
      weight: "N/A",
      pickup: "N/A",
      delivery: "N/A",
    }
  },
];

export default function LiveTrackingPage() {
  const { toast } = useToast();
  const [map, setMap] = useState<H.map.Map | null>(null);
  const [selectedTruck, setSelectedTruck] = useState(mockTrucks[0]);
  const [markers, setMarkers] = useState<H.map.Marker[]>([]);
  const [activeTab, setActiveTab] = useState("all-trucks");

  // Initialize the map when it's ready
  const handleMapReady = (mapInstance: H.map.Map) => {
    setMap(mapInstance);
    
    // Add truck markers
    const truckMarkers: H.map.Marker[] = [];
    
    mockTrucks.forEach(truck => {
      // Create a marker for each truck
      if (window.H && window.H.map) {
        const marker = new window.H.map.Marker(truck.position);
        mapInstance.addObject(marker);
        truckMarkers.push(marker);
      }
    });
    
    setMarkers(truckMarkers);
    
    // Center on first truck
    mapInstance.setCenter(mockTrucks[0].position);
    mapInstance.setZoom(7);
    
    toast({
      title: "Live tracking active",
      description: `${mockTrucks.length} trucks are being tracked`,
    });
  };
  
  // Focus the map on a specific truck
  const focusOnTruck = (truck: typeof mockTrucks[0]) => {
    if (map) {
      map.setCenter(truck.position);
      map.setZoom(12);
      setSelectedTruck(truck);
      
      toast({
        title: `Tracking ${truck.id}`,
        description: `${truck.driver} - ${truck.vehicle}`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Live Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Side panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Truck List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Truck className="w-5 h-5 mr-2" /> 
                Active Trucks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="all-trucks" className="flex-1">All ({mockTrucks.length})</TabsTrigger>
                    <TabsTrigger value="on-route" className="flex-1">On Route (1)</TabsTrigger>
                    <TabsTrigger value="idle" className="flex-1">Idle (2)</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all-trucks" className="m-0">
                  <div className="divide-y">
                    {mockTrucks.map(truck => (
                      <div 
                        key={truck.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 ${selectedTruck.id === truck.id ? 'bg-muted' : ''}`}
                        onClick={() => focusOnTruck(truck)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{truck.driver}</p>
                            <p className="text-xs text-muted-foreground">{truck.vehicle}</p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            truck.status === "On Route" ? "bg-green-100 text-green-800" :
                            truck.status === "Loading" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {truck.status}
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="flex-1 truncate">
                            {truck.destination !== "N/A" ? `To: ${truck.destination}` : "No active delivery"}
                          </span>
                          {truck.eta !== "N/A" && (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {truck.eta}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="on-route" className="m-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{mockTrucks[0].driver}</p>
                        <p className="text-xs text-muted-foreground">{mockTrucks[0].vehicle}</p>
                      </div>
                      <div className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {mockTrucks[0].status}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="flex-1 truncate">
                        To: {mockTrucks[0].destination}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {mockTrucks[0].eta}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="idle" className="m-0">
                  <div className="p-4">
                    <p className="text-sm text-center text-muted-foreground py-4">
                      Showing idle and loading trucks
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Selected Truck Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Truck Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Vehicle Information</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-medium">{selectedTruck.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Driver:</span>
                    <span className="font-medium">{selectedTruck.driver}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-medium">{selectedTruck.vehicle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{selectedTruck.status}</span>
                  </div>
                </div>
              </div>
              
              {selectedTruck.load.id !== "N/A" && (
                <div>
                  <h4 className="text-sm font-medium">Current Load</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Load ID:</span>
                      <span className="font-medium">{selectedTruck.load.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Description:</span>
                      <span className="font-medium">{selectedTruck.load.description}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{selectedTruck.load.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium text-right">{selectedTruck.load.pickup} → {selectedTruck.load.delivery}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Button className="w-full">
                  <Navigation className="mr-2 h-4 w-4" /> View Detailed Route
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
                center={selectedTruck.position}
                zoom={7}
                className="h-[750px] w-full"
                onMapReady={handleMapReady}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
