
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Phone,
  Mail,
  Truck,
  Star,
  Check,
  X,
  MessageSquare
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RequestData {
  id: string;
  driver: {
    id: string;
    name: string;
    avatar?: string;
    phone: string;
    email: string;
    rating: number;
    totalTrips: number;
  };
  vehicle: {
    type: string;
    capacity: string;
    registrationNumber: string;
  };
  load: {
    id: string;
    title: string;
    route: string;
    price: number;
  };
  message?: string;
  status: "pending" | "accepted" | "declined";
  timestamp: string;
}

const LoadRequests = () => {
  const { toast } = useToast();
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [responseAction, setResponseAction] = useState<"accept" | "decline" | null>(null);
  const [responseNote, setResponseNote] = useState("");

  const handleResponse = (request: RequestData, action: "accept" | "decline") => {
    setSelectedRequest(request);
    setResponseAction(action);
    setIsResponseDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    const action = responseAction === "accept" ? "Accepted" : "Declined";
    
    toast({
      title: `Request ${action}!`,
      description: `You have ${responseAction === "accept" ? "accepted" : "declined"} ${selectedRequest?.driver.name}'s request for '${selectedRequest?.load.title}'.`,
    });
    
    setIsResponseDialogOpen(false);
    setResponseNote("");
  };

  const pendingRequests = requestsData.filter(req => req.status === "pending");
  const acceptedRequests = requestsData.filter(req => req.status === "accepted");
  const declinedRequests = requestsData.filter(req => req.status === "declined");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Load Requests</h1>
        <p className="text-muted-foreground">
          Manage requests from drivers for your loads
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 bg-primary px-1 py-0 text-xs">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 pt-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No pending requests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  When drivers request your loads, they will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                onAccept={() => handleResponse(request, "accept")}
                onDecline={() => handleResponse(request, "decline")}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="accepted" className="space-y-4 pt-4">
          {acceptedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Check className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No accepted requests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Accepted requests will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            acceptedRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                showStatus 
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="declined" className="space-y-4 pt-4">
          {declinedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <X className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No declined requests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Declined requests will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            declinedRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                showStatus 
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {responseAction === "accept" ? "Accept Request" : "Decline Request"}
            </DialogTitle>
            <DialogDescription>
              {responseAction === "accept"
                ? "You are about to accept this driver's request."
                : "You are about to decline this driver's request."
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{selectedRequest.load.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedRequest.load.route}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  {selectedRequest.driver.avatar ? (
                    <div className="bg-muted aspect-square h-full w-full">
                      <img 
                        src={selectedRequest.driver.avatar} 
                        alt={selectedRequest.driver.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                      {selectedRequest.driver.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{selectedRequest.driver.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs">
                      {selectedRequest.driver.rating} ({selectedRequest.driver.totalTrips} trips)
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="response-note" className="text-sm font-medium">Add Note (Optional)</label>
                <Textarea
                  id="response-note"
                  placeholder={responseAction === "accept" 
                    ? "Any additional information or instructions for the driver..."
                    : "Reason for declining (optional)..."
                  }
                  value={responseNote}
                  onChange={(e) => setResponseNote(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>Cancel</Button>
            <Button 
              variant={responseAction === "accept" ? "default" : "destructive"}
              onClick={handleSubmitResponse}
            >
              {responseAction === "accept" ? "Accept Request" : "Decline Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Request Card Component
const RequestCard = ({ 
  request, 
  showStatus = false,
  onAccept,
  onDecline 
}: { 
  request: RequestData; 
  showStatus?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}) => {
  const statusColors = {
    pending: "bg-yellow-500",
    accepted: "bg-green-500",
    declined: "bg-red-500"
  };

  return (
    <Card>
      <CardContent className="grid gap-6 p-4 md:grid-cols-3">
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Driver</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {request.driver.avatar ? (
                <div className="bg-muted aspect-square h-full w-full">
                  <img 
                    src={request.driver.avatar} 
                    alt={request.driver.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                  {request.driver.name.charAt(0)}
                </div>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{request.driver.name}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs">
                  {request.driver.rating} ({request.driver.totalTrips} trips)
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span>{request.driver.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span>{request.driver.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Load Details</p>
            <p className="font-medium">{request.load.title}</p>
            <p className="text-sm text-muted-foreground">{request.load.route}</p>
            <p className="text-sm font-medium">${request.load.price.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Vehicle</p>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{request.vehicle.type} - {request.vehicle.capacity}</span>
            </div>
            <p className="text-xs text-muted-foreground">Reg: {request.vehicle.registrationNumber}</p>
          </div>
        </div>

        <div className="space-y-3">
          {request.message && (
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">Message from Driver</p>
              <div className="rounded-md bg-muted p-2 text-sm">
                <p>{request.message}</p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Requested: {request.timestamp}</p>
            
            {showStatus ? (
              <div className="flex items-center gap-2">
                <Badge className={statusColors[request.status]}>
                  {request.status === "accepted" ? "Accepted" : "Declined"}
                </Badge>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={onAccept}
                >
                  <Check className="mr-1 h-4 w-4" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  size="sm"
                  onClick={onDecline}
                >
                  <X className="mr-1 h-4 w-4" />
                  Decline
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data for requests
const requestsData: RequestData[] = [
  {
    id: "req1",
    driver: {
      id: "driver1",
      name: "John Smith",
      phone: "480-555-1234",
      email: "john.smith@example.com",
      rating: 4.8,
      totalTrips: 132
    },
    vehicle: {
      type: "Box Truck",
      capacity: "15,000 lbs",
      registrationNumber: "AZ-78563"
    },
    load: {
      id: "load1",
      title: "Electronics Shipment",
      route: "Phoenix, AZ to Los Angeles, CA",
      price: 1250
    },
    message: "I have experience with sensitive electronic shipments and have a climate-controlled truck ready to go.",
    status: "pending",
    timestamp: "Today, 2:30 PM"
  },
  {
    id: "req2",
    driver: {
      id: "driver2",
      name: "Maria Rodriguez",
      phone: "480-555-5678",
      email: "maria.r@example.com",
      rating: 4.9,
      totalTrips: 215
    },
    vehicle: {
      type: "Semi-Trailer",
      capacity: "42,000 lbs",
      registrationNumber: "AZ-12345"
    },
    load: {
      id: "load2",
      title: "Retail Merchandise",
      route: "Scottsdale, AZ to Las Vegas, NV",
      price: 950
    },
    status: "accepted",
    timestamp: "Yesterday, 10:15 AM"
  },
  {
    id: "req3",
    driver: {
      id: "driver3",
      name: "Robert Johnson",
      phone: "480-555-9876",
      email: "robert.j@example.com",
      rating: 4.2,
      totalTrips: 78
    },
    vehicle: {
      type: "Flatbed",
      capacity: "24,000 lbs",
      registrationNumber: "AZ-45678"
    },
    load: {
      id: "load3",
      title: "Construction Materials",
      route: "Mesa, AZ to Salt Lake City, UT",
      price: 1850
    },
    message: "I can pick up on short notice if needed.",
    status: "declined",
    timestamp: "Apr 5, 5:45 PM"
  }
];

export default LoadRequests;
