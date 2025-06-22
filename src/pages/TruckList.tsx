
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
  Search,
  Truck,
  MapPin,
  Check,
  Filter,
  SlidersHorizontal,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

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
  availableFrom?: string;
}

const TruckList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<TruckType[]>([]);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "capacity">("distance");
  const [dateFilter, setDateFilter] = useState<string>("");
  const isMobile = useIsMobile();
  
  const handleTypeToggle = (type: TruckType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const filteredTrucks = trucks.filter(
    (truck) => {
      // Search filter
      const searchMatch = 
        truck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(truck.type);
      
      // Date filter
      const dateMatch = !dateFilter || truck.availableFrom === dateFilter;
      
      return searchMatch && typeMatch && dateMatch;
    }
  );

  const sortedTrucks = [...filteredTrucks].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "capacity") {
      return parseInt(a.capacity.replace(/[^\d]/g, '')) - parseInt(b.capacity.replace(/[^\d]/g, ''));
    }
    return 0;
  });

  const truckTypes: TruckType[] = ["Box Truck", "Flatbed", "Refrigerated", "Semi-Trailer", "Tanker"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Find Trucks</h1>
          <p className="text-muted-foreground">
            Browse available trucks near your location
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "default"} asChild>
            <Link to="/post-load">
              <Truck className="mr-2 h-4 w-4" />
              Post a Load
            </Link>
          </Button>
          <Button variant="default" size={isMobile ? "sm" : "default"}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search trucks by name, type or location..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {truckTypes.map((type) => (
                <DropdownMenuItem key={type} onSelect={(e) => e.preventDefault()} className="flex gap-2">
                  <Checkbox 
                    id={`filter-${type}`}
                    checked={selectedTypes.includes(type)} 
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <label 
                    htmlFor={`filter-${type}`}
                    className="flex-1 cursor-pointer"
                  >
                    {type}
                  </label>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Available Date</DropdownMenuLabel>
              <div className="px-2 py-1.5">
                <Input 
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setSelectedTypes([]);
                    setDateFilter("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className={sortBy === "distance" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => setSortBy("distance")}
              >
                Nearest First
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === "rating" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => setSortBy("rating")}
              >
                Highest Rated
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === "capacity" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => setSortBy("capacity")}
              >
                Capacity (High to Low)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedTrucks.length} of {trucks.length} trucks
      </div>

      {/* Trucks Grid - Responsive for mobile, tablet, and desktop */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTrucks.map((truck) => (
          <Link key={truck.id} to={`/trucks/${truck.id}`} className="block h-full">
            <Card className="card-hover h-full overflow-hidden transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={truck.imageUrl}
                  alt={truck.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {truck.availableFrom && (
                  <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(truck.availableFrom).toLocaleDateString()}
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{truck.name}</CardTitle>
                  {truck.verified && (
                    <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-500">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium">{truck.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="font-medium">{truck.capacity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 font-medium">{truck.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{truck.location}</span>
                  </div>
                  <Badge className="bg-primary">{truck.distance} miles</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedTrucks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Truck className="h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No trucks found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedTypes([]);
              setDateFilter("");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

// Mock data for trucks with added available dates
const trucks: TruckData[] = [
  {
    id: "truck1",
    name: "FreightMaster 2500",
    type: "Box Truck",
    capacity: "15,000 lbs",
    location: "Phoenix, AZ",
    distance: 3.2,
    rating: 4.8,
    verified: true,
    availableFrom: "2025-04-10",
    imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "truck2",
    name: "HaulPro X1",
    type: "Flatbed",
    capacity: "28,000 lbs",
    location: "Scottsdale, AZ",
    distance: 12.5,
    rating: 4.5,
    verified: true,
    availableFrom: "2025-04-08",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "truck3",
    name: "CoolTrans Reefer",
    type: "Refrigerated",
    capacity: "22,000 lbs",
    location: "Tempe, AZ",
    distance: 15.7,
    rating: 4.7,
    verified: false,
    availableFrom: "2025-04-12",
    imageUrl: "https://images.unsplash.com/photo-1566207475226-a0f26874df05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "truck4",
    name: "RoadRunner 3500",
    type: "Semi-Trailer",
    capacity: "45,000 lbs",
    location: "Mesa, AZ",
    distance: 18.3,
    rating: 4.9,
    verified: true,
    availableFrom: "2025-04-15",
    imageUrl: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "truck5",
    name: "LiquidMove T200",
    type: "Tanker",
    capacity: "32,000 lbs",
    location: "Glendale, AZ",
    distance: 24.1,
    rating: 4.6,
    verified: false,
    availableFrom: "2025-04-07",
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "truck6",
    name: "CargoMax 5000",
    type: "Box Truck",
    capacity: "18,000 lbs",
    location: "Chandler, AZ",
    distance: 21.6,
    rating: 4.4,
    verified: true,
    availableFrom: "2025-04-20",
    imageUrl: "https://images.unsplash.com/photo-1578483029755-a16ed26ed547?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  }
];

export default TruckList;
