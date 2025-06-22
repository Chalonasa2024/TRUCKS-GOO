
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
  Package,
  Truck,
  MapPin,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress"; 

interface Shipment {
  id: string;
  title: string;
  driver: string;
  truckType: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  status: "ongoing" | "completed" | "scheduled";
  progress: number;
}

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter shipments based on search term
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.truckType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">
            Track and manage all your ongoing and scheduled shipments
          </p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shipments..."
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

      {/* Shipments Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4">
            {filteredShipments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Package className="mb-2 h-12 w-12 text-muted-foreground/80" />
                  <h3 className="text-lg font-medium">No shipments found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredShipments.map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ongoing">
          <div className="grid gap-4">
            {filteredShipments
              .filter((shipment) => shipment.status === "ongoing")
              .map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <div className="grid gap-4">
            {filteredShipments
              .filter((shipment) => shipment.status === "scheduled")
              .map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Shipment Card Component
const ShipmentCard = ({ shipment }: { shipment: Shipment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "ongoing":
        return "bg-blue-500";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{shipment.title}</CardTitle>
          <Badge
            className={`${getStatusColor(shipment.status)} text-white`}
          >
            <span className="capitalize">{shipment.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Driver</p>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{shipment.driver}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Truck Type</p>
            <p className="font-medium">{shipment.truckType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pickup Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{shipment.pickupDate}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Delivery Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{shipment.deliveryDate}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{shipment.origin}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{shipment.destination}</span>
              </div>
            </div>

            {shipment.status !== "scheduled" && (
              <div className="flex items-center gap-2">
                <Progress value={shipment.progress} className="h-2" />
                <span className="text-xs font-medium">{shipment.progress}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Track Shipment</Button>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data for shipments
const shipments: Shipment[] = [
  {
    id: "ship1",
    title: "Electronics Shipment",
    driver: "Michael Johnson",
    truckType: "Box Truck",
    origin: "Phoenix, AZ",
    destination: "Las Vegas, NV",
    pickupDate: "Apr 10, 2025",
    deliveryDate: "Apr 12, 2025",
    status: "ongoing",
    progress: 65,
  },
  {
    id: "ship2",
    title: "Construction Materials",
    driver: "Sarah Wilson",
    truckType: "Flatbed",
    origin: "Scottsdale, AZ",
    destination: "Denver, CO",
    pickupDate: "Apr 15, 2025",
    deliveryDate: "Apr 18, 2025",
    status: "scheduled",
    progress: 0,
  },
  {
    id: "ship3",
    title: "Grocery Delivery",
    driver: "Robert Davis",
    truckType: "Refrigerated",
    origin: "Tempe, AZ",
    destination: "Los Angeles, CA",
    pickupDate: "Apr 05, 2025",
    deliveryDate: "Apr 07, 2025",
    status: "completed",
    progress: 100,
  },
  {
    id: "ship4",
    title: "Manufacturing Equipment",
    driver: "James Smith",
    truckType: "Semi-Trailer",
    origin: "Mesa, AZ",
    destination: "San Diego, CA",
    pickupDate: "Apr 08, 2025",
    deliveryDate: "Apr 11, 2025",
    status: "ongoing",
    progress: 30,
  },
];

export default Shipments;
