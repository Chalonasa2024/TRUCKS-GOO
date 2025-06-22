
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  MapPin, 
  Phone, 
  Calendar, 
  FileText, 
  Check, 
  Package,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";

type TruckType = "Box Truck" | "Flatbed" | "Refrigerated" | "Semi-Trailer" | "Tanker";

interface TruckData {
  id: string;
  name: string;
  type: TruckType;
  capacity: string;
  location: string;
  distance: number;
  rating: number;
  verified: boolean;
  imageUrl: string;
  registrationNumber: string;
  yearOfManufacture: string;
  insuranceValid: string;
  driver: {
    name: string;
    experience: string;
    phone: string;
    imageUrl: string;
  };
  history: {
    date: string;
    from: string;
    to: string;
    status: "completed" | "canceled" | "rejected";
    client: string;
  }[];
}

// Mock data for a single truck
const truckData: Record<string, TruckData> = {
  "truck1": {
    id: "truck1",
    name: "FreightMaster 2500",
    type: "Box Truck",
    capacity: "15,000 lbs",
    location: "Phoenix, AZ",
    distance: 3.2,
    rating: 4.8,
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    registrationNumber: "AZ-738292",
    yearOfManufacture: "2021",
    insuranceValid: "Jan 15, 2026",
    driver: {
      name: "Michael Johnson",
      experience: "8 years",
      phone: "480-555-1234",
      imageUrl: "https://i.pravatar.cc/300?img=11"
    },
    history: [
      {
        date: "Mar 28, 2025",
        from: "Phoenix, AZ",
        to: "Las Vegas, NV",
        status: "completed",
        client: "Tech Solutions Inc."
      },
      {
        date: "Mar 15, 2025",
        from: "Los Angeles, CA",
        to: "Phoenix, AZ",
        status: "completed",
        client: "EcoFriendly Supplies"
      },
      {
        date: "Feb 22, 2025",
        from: "Tucson, AZ",
        to: "Albuquerque, NM",
        status: "completed",
        client: "Southwest Distributors"
      },
      {
        date: "Feb 10, 2025",
        from: "Phoenix, AZ",
        to: "San Diego, CA",
        status: "canceled",
        client: "Pacific Traders Co."
      }
    ]
  },
  "truck2": {
    id: "truck2",
    name: "HaulPro X1",
    type: "Flatbed",
    capacity: "28,000 lbs",
    location: "Scottsdale, AZ",
    distance: 12.5,
    rating: 4.5,
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    registrationNumber: "AZ-567123",
    yearOfManufacture: "2022",
    insuranceValid: "Oct 30, 2025",
    driver: {
      name: "Sarah Wilson",
      experience: "5 years",
      phone: "480-555-6789",
      imageUrl: "https://i.pravatar.cc/300?img=5"
    },
    history: [
      {
        date: "Apr 05, 2025",
        from: "Scottsdale, AZ",
        to: "Denver, CO",
        status: "completed",
        client: "Mountain Movers Inc."
      },
      {
        date: "Mar 22, 2025",
        from: "Salt Lake City, UT",
        to: "Phoenix, AZ",
        status: "completed",
        client: "Desert Logistics"
      },
      {
        date: "Mar 10, 2025",
        from: "Scottsdale, AZ",
        to: "Santa Fe, NM",
        status: "rejected",
        client: "Southwest Cargo Ltd."
      }
    ]
  }
};

const TruckDetail = () => {
  const { truckId } = useParams<{ truckId: string }>();
  const truck = truckData[truckId || "truck1"];

  if (!truck) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Truck not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/trucks">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{truck.name}</h1>
        {truck.verified && (
          <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-500">
            <Check className="h-3 w-3" /> Verified
          </Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Truck Image and Details */}
        <div className="md:col-span-2">
          <Card>
            <div className="aspect-video overflow-hidden">
              <img
                src={truck.imageUrl}
                alt={truck.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <CardContent className="pt-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="details">Truck Details</TabsTrigger>
                  <TabsTrigger value="driver">Driver Info</TabsTrigger>
                  <TabsTrigger value="history">Trip History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Truck Type</p>
                      <p className="font-medium">{truck.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-medium">{truck.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registration Number</p>
                      <p className="font-medium">{truck.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year of Manufacture</p>
                      <p className="font-medium">{truck.yearOfManufacture}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{truck.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Insurance Valid Until</p>
                      <p className="font-medium">{truck.insuranceValid}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="driver" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <img src={truck.driver.imageUrl} alt={truck.driver.name} />
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{truck.driver.name}</h3>
                      <p className="text-sm text-muted-foreground">{truck.driver.experience} of experience</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Number</p>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{truck.driver.phone}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    {truck.history.map((trip, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{trip.date}</span>
                            <Badge
                              variant={
                                trip.status === "completed"
                                  ? "default"
                                  : trip.status === "canceled"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {trip.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium">
                            {trip.from} → {trip.to}
                          </h4>
                          <p className="text-sm text-muted-foreground">Client: {trip.client}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions and Additional Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Request to Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  This truck is currently available and accepting bookings.
                </p>
                <Button className="w-full">Request to Book</Button>
                <Button variant="outline" className="w-full">Contact Driver</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">Vehicle Registration</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">Verified</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">Insurance Certificate</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">Verified</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">Maintenance Records</span>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TruckDetail;
