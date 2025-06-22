
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Package,
  Building,
  CalendarClock,
  DollarSign,
  Send,
  Filter
} from "lucide-react";
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

interface LoadData {
  id: string;
  title: string;
  company: {
    name: string;
    verified: boolean;
  };
  pickup: {
    location: string;
    date: string;
  };
  delivery: {
    location: string;
    date: string;
  };
  distance: number;
  weight: string;
  price: number;
  description: string;
}

const AvailableLoads = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoad, setSelectedLoad] = useState<LoadData | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestNote, setRequestNote] = useState("");

  const filteredLoads = loadsData.filter(
    (load) =>
      load.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.pickup.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.delivery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestLoad = (load: LoadData) => {
    setSelectedLoad(load);
    setIsRequestDialogOpen(true);
  };

  const handleSendRequest = () => {
    toast({
      title: "Request sent!",
      description: `Your request for ${selectedLoad?.title} has been sent to ${selectedLoad?.company.name}.`,
    });
    setIsRequestDialogOpen(false);
    setRequestNote("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Loads</h1>
          <p className="text-muted-foreground">
            Find and request loads that match your vehicle
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search loads by location, company or description..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">Sort By</Button>
        </div>
      </div>

      {/* Loads List */}
      <div className="grid gap-4">
        {filteredLoads.map((load) => (
          <Card key={load.id} className="overflow-hidden">
            <CardContent className="grid gap-4 p-4 md:grid-cols-4">
              <div className="md:col-span-3">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{load.title}</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{load.company.name}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500">${load.price.toLocaleString()}</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Pickup</p>
                        <p className="text-sm text-muted-foreground">{load.pickup.location}</p>
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{load.pickup.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Delivery</p>
                        <p className="text-sm text-muted-foreground">{load.delivery.location}</p>
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{load.delivery.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{load.weight}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{load.distance} miles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>~${(load.price / load.distance).toFixed(2)}/mile</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-end justify-end md:col-span-1">
                <Button 
                  className="w-full md:w-auto" 
                  onClick={() => handleRequestLoad(load)}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Load</DialogTitle>
            <DialogDescription>
              Send your request to the company for this load. You can include additional notes or questions.
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoad && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{selectedLoad.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedLoad.company.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Pickup</p>
                  <p>{selectedLoad.pickup.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delivery</p>
                  <p>{selectedLoad.delivery.location}</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</label>
                <Textarea
                  id="notes"
                  placeholder="Add any specific requirements, questions or information..."
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data for loads
const loadsData: LoadData[] = [
  {
    id: "load1",
    title: "Electronics Shipment",
    company: {
      name: "TechTransport Inc.",
      verified: true
    },
    pickup: {
      location: "Phoenix, AZ",
      date: "Apr 10, 2025"
    },
    delivery: {
      location: "Los Angeles, CA",
      date: "Apr 12, 2025"
    },
    distance: 372,
    weight: "7,500 lbs",
    price: 1250,
    description: "Electronic components requiring careful handling and climate-controlled transport."
  },
  {
    id: "load2",
    title: "Medical Supplies",
    company: {
      name: "MediQuick Logistics",
      verified: true
    },
    pickup: {
      location: "Tempe, AZ",
      date: "Apr 11, 2025"
    },
    delivery: {
      location: "San Diego, CA",
      date: "Apr 13, 2025"
    },
    distance: 355,
    weight: "4,200 lbs",
    price: 1400,
    description: "Time-sensitive medical supplies for hospitals and clinics."
  },
  {
    id: "load3",
    title: "Retail Merchandise",
    company: {
      name: "RetailShip Co.",
      verified: false
    },
    pickup: {
      location: "Scottsdale, AZ",
      date: "Apr 12, 2025"
    },
    delivery: {
      location: "Las Vegas, NV",
      date: "Apr 13, 2025"
    },
    distance: 295,
    weight: "12,800 lbs",
    price: 950,
    description: "Retail merchandise for department store chain."
  },
  {
    id: "load4",
    title: "Automotive Parts",
    company: {
      name: "Auto Logistics Partners",
      verified: true
    },
    pickup: {
      location: "Mesa, AZ",
      date: "Apr 14, 2025"
    },
    delivery: {
      location: "Denver, CO",
      date: "Apr 18, 2025"
    },
    distance: 862,
    weight: "9,700 lbs",
    price: 2800,
    description: "Automotive parts and components for manufacturing plant."
  },
  {
    id: "load5",
    title: "Food Products",
    company: {
      name: "Fresh Freight Systems",
      verified: true
    },
    pickup: {
      location: "Chandler, AZ",
      date: "Apr 11, 2025"
    },
    delivery: {
      location: "Salt Lake City, UT",
      date: "Apr 13, 2025"
    },
    distance: 658,
    weight: "16,500 lbs",
    price: 2100,
    description: "Refrigerated transport of food products requiring temperature control."
  }
];

export default AvailableLoads;
