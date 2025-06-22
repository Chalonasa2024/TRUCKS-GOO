
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  List,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

interface Request {
  id: string;
  driverName: string;
  truckType: string;
  origin: string;
  destination: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter requests based on search term
  const filteredIncoming = incomingRequests.filter(
    (request) =>
      request.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.truckType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSent = sentRequests.filter(
    (request) =>
      request.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.truckType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requests</h1>
          <p className="text-muted-foreground">
            Manage your incoming and outgoing logistics requests
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by driver, truck type, location..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline">Sort By</Button>
        </div>
      </div>

      {/* Requests Tabs */}
      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming">
          <div className="grid gap-4">
            {filteredIncoming.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <List className="mb-2 h-12 w-12 text-muted-foreground/80" />
                  <h3 className="text-lg font-medium">No incoming requests found</h3>
                  <p className="text-sm text-muted-foreground">Requests from drivers will appear here</p>
                </CardContent>
              </Card>
            ) : (
              filteredIncoming.map((request) => (
                <RequestCard key={request.id} request={request} type="incoming" />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="sent">
          <div className="grid gap-4">
            {filteredSent.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <List className="mb-2 h-12 w-12 text-muted-foreground/80" />
                  <h3 className="text-lg font-medium">No sent requests found</h3>
                  <p className="text-sm text-muted-foreground">Requests you've sent to drivers will appear here</p>
                </CardContent>
              </Card>
            ) : (
              filteredSent.map((request) => (
                <RequestCard key={request.id} request={request} type="sent" />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Request Card Component
const RequestCard = ({ request, type }: { request: Request; type: "incoming" | "sent" }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{request.driverName}</CardTitle>
          <Badge
            className={`flex items-center gap-1 ${getStatusColor(request.status)} text-white`}
          >
            {getStatusIcon(request.status)}
            <span className="capitalize">{request.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Truck Type</p>
            <p className="font-medium">{request.truckType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Request Date</p>
            <p className="font-medium">{request.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Origin</p>
            <p className="font-medium">{request.origin}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Destination</p>
            <p className="font-medium">{request.destination}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {request.status === "pending" && type === "incoming" && (
            <>
              <Button variant="outline" size="sm">Reject</Button>
              <Button size="sm">Accept</Button>
            </>
          )}
          {request.status === "pending" && type === "sent" && (
            <Button variant="outline" size="sm">Cancel Request</Button>
          )}
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data for incoming requests
const incomingRequests: Request[] = [
  {
    id: "req1",
    driverName: "Michael Johnson",
    truckType: "Box Truck",
    origin: "Phoenix, AZ",
    destination: "Las Vegas, NV",
    date: "Apr 10, 2025",
    status: "pending",
  },
  {
    id: "req2",
    driverName: "Sarah Wilson",
    truckType: "Flatbed",
    origin: "Scottsdale, AZ",
    destination: "Denver, CO",
    date: "Apr 08, 2025",
    status: "accepted",
  },
  {
    id: "req3",
    driverName: "Robert Davis",
    truckType: "Refrigerated",
    origin: "Tempe, AZ",
    destination: "Los Angeles, CA",
    date: "Apr 05, 2025",
    status: "rejected",
  },
];

// Mock data for sent requests
const sentRequests: Request[] = [
  {
    id: "sent1",
    driverName: "James Smith",
    truckType: "Semi-Trailer",
    origin: "Mesa, AZ",
    destination: "San Diego, CA",
    date: "Apr 09, 2025",
    status: "pending",
  },
  {
    id: "sent2",
    driverName: "Emma Brown",
    truckType: "Tanker",
    origin: "Chandler, AZ",
    destination: "Salt Lake City, UT",
    date: "Apr 07, 2025",
    status: "accepted",
  },
];

export default Requests;
