
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Download, Calendar, Clock, User, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const PickupDropInfo = () => {
  // In a real app, this would come from an API
  const pickupInfo = {
    location: "123 Warehouse St, Phoenix, AZ 85001",
    date: "2025-04-10",
    time: "10:00 AM",
    contact: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    notes: "Enter through Gate B. Security check required.",
    qrCode: true,
  };
  
  const deliveryInfo = {
    location: "456 Distribution Ave, Las Vegas, NV 89101",
    date: "2025-04-10",
    time: "6:00 PM",
    contact: "Jane Doe",
    phone: "(555) 987-6543",
    email: "jane.doe@example.com",
    notes: "Call 30 minutes before arrival. Fork lift available for unloading.",
    qrCode: false,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Pickup & Drop Info</h1>
      </div>
      
      <Tabs defaultValue="pickup">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pickup">Pickup Information</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pickup">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Location</CardTitle>
                <CardDescription>{pickupInfo.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="grid grid-cols-2 w-full">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{pickupInfo.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="grid grid-cols-2 w-full">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm font-medium">{pickupInfo.time}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                  <div className="rounded-md border p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="grid grid-cols-2 w-full">
                        <span className="text-sm text-muted-foreground">Name:</span>
                        <span className="text-sm font-medium">{pickupInfo.contact}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div className="grid grid-cols-2 w-full">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm font-medium">{pickupInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Special Notes</h3>
                  <div className="rounded-md border p-3 text-sm">
                    {pickupInfo.notes}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Contact
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    Open in Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>Scan this at the pickup location</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {pickupInfo.qrCode ? (
                    <div className="aspect-square w-48 bg-gray-100 flex items-center justify-center border rounded-md">
                      <div className="text-xl font-mono p-6 text-center">
                        [QR CODE]
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground p-6">
                      No QR code required for this pickup
                    </div>
                  )}
                  {pickupInfo.qrCode && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pickup Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">1</Badge>
                    <p className="text-sm">Call the contact person upon arrival</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">2</Badge>
                    <p className="text-sm">Present your ID at security gate</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">3</Badge>
                    <p className="text-sm">Scan QR code at check-in</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">4</Badge>
                    <p className="text-sm">Verify cargo count and condition</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">5</Badge>
                    <p className="text-sm">Update app status to "In Transit" after loading</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="delivery">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Location</CardTitle>
                <CardDescription>{deliveryInfo.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="grid grid-cols-2 w-full">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{deliveryInfo.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="grid grid-cols-2 w-full">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm font-medium">{deliveryInfo.time}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                  <div className="rounded-md border p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="grid grid-cols-2 w-full">
                        <span className="text-sm text-muted-foreground">Name:</span>
                        <span className="text-sm font-medium">{deliveryInfo.contact}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div className="grid grid-cols-2 w-full">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm font-medium">{deliveryInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Special Notes</h3>
                  <div className="rounded-md border p-3 text-sm">
                    {deliveryInfo.notes}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Contact
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    Open in Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Confirmation</CardTitle>
                  <CardDescription>Complete after successful delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Mark as Delivered</Button>
                  <div className="text-center text-sm text-muted-foreground">
                    You'll be prompted to take a photo and collect a signature
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">1</Badge>
                    <p className="text-sm">Call 30 minutes before arrival</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">2</Badge>
                    <p className="text-sm">Use delivery dock #3</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">3</Badge>
                    <p className="text-sm">Unload goods with available forklift</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">4</Badge>
                    <p className="text-sm">Have receiver verify and sign for delivery</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">5</Badge>
                    <p className="text-sm">Take photo of delivered goods</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">6</Badge>
                    <p className="text-sm">Mark delivery as complete in the app</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PickupDropInfo;
