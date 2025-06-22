
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  CalendarClock, 
  Package,
  Building,
  Navigation,
  Phone,
  MessageSquare,
  AlertTriangle,
  Check,
  MoreVertical
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingData {
  id: string;
  status: "upcoming" | "in_progress" | "completed" | "cancelled";
  load: {
    id: string;
    title: string;
    description: string;
    weight: string;
    company: {
      name: string;
      contactPhone: string;
      contactEmail: string;
    };
  };
  pickup: {
    location: string;
    date: string;
    time: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  delivery: {
    location: string;
    date: string;
    time: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  distance: number;
  progress?: number;
}

const MyBookings = () => {
  const { toast } = useToast();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [reportIssue, setReportIssue] = useState("");

  const handleReportIssue = (booking: BookingData) => {
    setSelectedBooking(booking);
    setIsReportDialogOpen(true);
  };

  const handleSubmitReport = () => {
    if (!reportIssue.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please describe the issue before submitting.",
      });
      return;
    }
    
    toast({
      title: "Issue reported",
      description: "Your report has been submitted and the company has been notified.",
    });
    
    setIsReportDialogOpen(false);
    setReportIssue("");
  };

  const startNavigation = (booking: BookingData) => {
    toast({
      title: "Starting navigation",
      description: "Opening navigation to " + booking.pickup.location,
    });
    // Navigation logic would go here
  };

  const markAsCompleted = (bookingId: string) => {
    toast({
      title: "Delivery completed",
      description: "The delivery has been marked as completed.",
    });
    // Mark as completed logic would go here
  };

  // Filter bookings by status
  const upcomingBookings = bookingsData.filter(b => b.status === "upcoming");
  const activeBookings = bookingsData.filter(b => b.status === "in_progress");
  const completedBookings = bookingsData.filter(b => b.status === "completed");
  const cancelledBookings = bookingsData.filter(b => b.status === "cancelled");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage and track your active and upcoming loads
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active
            {activeBookings.length > 0 && (
              <Badge className="ml-2 bg-primary px-1 py-0 text-xs">{activeBookings.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 pt-4">
          {activeBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No active bookings</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any loads in progress at the moment.
                </p>
                <Button className="mt-4" variant="outline">Find Available Loads</Button>
              </CardContent>
            </Card>
          ) : (
            activeBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onNavigate={() => startNavigation(booking)}
                onReportIssue={() => handleReportIssue(booking)}
                onMarkCompleted={() => markAsCompleted(booking.id)}
                showProgress
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CalendarClock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No upcoming bookings</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any scheduled loads coming up.
                </p>
                <Button className="mt-4" variant="outline">Find Available Loads</Button>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onNavigate={() => startNavigation(booking)}
                onReportIssue={() => handleReportIssue(booking)}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 pt-4">
          {completedBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Check className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No completed bookings</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your completed deliveries will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            completedBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                completed 
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4 pt-4">
          {cancelledBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No cancelled bookings</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cancelled deliveries will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            cancelledBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                cancelled 
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Report Issue Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Describe the issue you're experiencing with this delivery.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{selectedBooking.load.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedBooking.pickup.location} to {selectedBooking.delivery.location}
                </p>
              </div>
              
              <div>
                <label htmlFor="issue-description" className="text-sm font-medium">Issue Description</label>
                <Textarea
                  id="issue-description"
                  placeholder="Describe the issue you're experiencing..."
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                  className="mt-1"
                  rows={5}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ 
  booking,
  completed = false,
  cancelled = false,
  showProgress = false,
  onNavigate,
  onReportIssue,
  onMarkCompleted
}: { 
  booking: BookingData; 
  completed?: boolean;
  cancelled?: boolean;
  showProgress?: boolean;
  onNavigate?: () => void;
  onReportIssue?: () => void;
  onMarkCompleted?: () => void;
}) => {
  return (
    <Card className={cancelled ? "border-red-200 bg-red-50" : ""}>
      <CardContent className="grid gap-4 p-4 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{booking.load.title}</h3>
            <Badge 
              className={cn(
                booking.status === "upcoming" && "bg-blue-500",
                booking.status === "in_progress" && "bg-green-500",
                booking.status === "completed" && "bg-purple-500",
                booking.status === "cancelled" && "bg-red-500"
              )}
            >
              {getStatusLabel(booking.status)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{booking.load.company.name}</span>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">{booking.load.description}</p>
          </div>
          
          {showProgress && booking.progress && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{booking.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${booking.progress}%` }} 
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>{booking.load.weight}</span>
            <span className="mx-2">•</span>
            <span>${booking.price.toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span>{booking.distance} miles</span>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-2 md:col-span-2 md:flex-row md:space-y-0">
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Pickup</span>
              </div>
              <p className="text-sm">{booking.pickup.location}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarClock className="h-3 w-3" />
                <span>{booking.pickup.date} at {booking.pickup.time}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="font-medium">Delivery</span>
              </div>
              <p className="text-sm">{booking.delivery.location}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarClock className="h-3 w-3" />
                <span>{booking.delivery.date} at {booking.delivery.time}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-end gap-2">
            {!completed && !cancelled && (
              <>
                {onNavigate && (
                  <Button 
                    size="sm" 
                    className="w-full md:w-auto"
                    onClick={onNavigate}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Navigate
                  </Button>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${booking.load.company.contactPhone}`}
                  >
                    <Phone className="mr-1 h-4 w-4" />
                    Call
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Message
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onReportIssue && (
                        <DropdownMenuItem onClick={onReportIssue}>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Report Issue
                        </DropdownMenuItem>
                      )}
                      {onMarkCompleted && (
                        <DropdownMenuItem onClick={onMarkCompleted}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark Completed
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format status labels
function getStatusLabel(status: BookingData['status']): string {
  switch (status) {
    case "upcoming":
      return "Upcoming";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Mock data for bookings
const bookingsData: BookingData[] = [
  {
    id: "book1",
    status: "in_progress",
    load: {
      id: "load1",
      title: "Electronics Shipment",
      description: "Electronics requiring climate control and careful handling",
      weight: "7,500 lbs",
      company: {
        name: "TechShip Inc.",
        contactPhone: "480-555-1234",
        contactEmail: "dispatch@techship.com"
      }
    },
    pickup: {
      location: "Phoenix, AZ",
      date: "Apr 10, 2025",
      time: "8:00 AM"
    },
    delivery: {
      location: "Los Angeles, CA",
      date: "Apr 12, 2025",
      time: "2:00 PM"
    },
    price: 1250,
    distance: 372,
    progress: 65
  },
  {
    id: "book2",
    status: "upcoming",
    load: {
      id: "load2",
      title: "Medical Supplies",
      description: "Time-sensitive medical supplies requiring careful handling",
      weight: "4,200 lbs",
      company: {
        name: "MediQuick Logistics",
        contactPhone: "480-555-5678",
        contactEmail: "dispatch@mediquick.com"
      }
    },
    pickup: {
      location: "Tempe, AZ",
      date: "Apr 11, 2025",
      time: "9:30 AM"
    },
    delivery: {
      location: "San Diego, CA",
      date: "Apr 13, 2025",
      time: "11:00 AM"
    },
    price: 1400,
    distance: 355
  },
  {
    id: "book3",
    status: "completed",
    load: {
      id: "load3",
      title: "Retail Merchandise",
      description: "Retail goods for department store chain",
      weight: "12,800 lbs",
      company: {
        name: "RetailShip Co.",
        contactPhone: "480-555-9012",
        contactEmail: "dispatch@retailship.com"
      }
    },
    pickup: {
      location: "Scottsdale, AZ",
      date: "Apr 5, 2025",
      time: "7:00 AM"
    },
    delivery: {
      location: "Las Vegas, NV",
      date: "Apr 6, 2025",
      time: "3:30 PM"
    },
    price: 950,
    distance: 295
  },
  {
    id: "book4",
    status: "cancelled",
    load: {
      id: "load4",
      title: "Furniture Delivery",
      description: "Office furniture for corporate headquarters",
      weight: "8,600 lbs",
      company: {
        name: "Office Solutions Inc.",
        contactPhone: "480-555-3456",
        contactEmail: "dispatch@officesolutions.com"
      }
    },
    pickup: {
      location: "Mesa, AZ",
      date: "Apr 2, 2025",
      time: "10:00 AM"
    },
    delivery: {
      location: "Salt Lake City, UT",
      date: "Apr 4, 2025",
      time: "2:00 PM"
    },
    price: 1500,
    distance: 658
  }
];

export default MyBookings;
