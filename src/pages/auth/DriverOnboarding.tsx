
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Phone, FileText, MapPin } from "lucide-react";

const DriverOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  const [truckType, setTruckType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [hasRefrigeration, setHasRefrigeration] = useState(false);
  const [hasLiftgate, setHasLiftgate] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful profile setup
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("needsProfileSetup", "false");
      localStorage.setItem("driverPhone", phone);
      localStorage.setItem("driverAddress", address);
      localStorage.setItem("driverCity", city);
      localStorage.setItem("driverState", state);
      localStorage.setItem("driverZip", zipCode);
      localStorage.setItem("truckType", truckType);
      localStorage.setItem("truckCapacity", capacity);
      localStorage.setItem("licensePlate", licensePlate);
      localStorage.setItem("hasRefrigeration", hasRefrigeration.toString());
      localStorage.setItem("hasLiftgate", hasLiftgate.toString());
      
      toast({
        title: "Profile Completed",
        description: "Welcome to Cargo Flow!",
      });
      
      navigate("/driver");
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Driver Profile</CardTitle>
          <CardDescription>
            Please provide additional information about you and your vehicle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Contact Information</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Home Address</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address"
                placeholder="123 Main St"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  placeholder="Phoenix"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state"
                  placeholder="Arizona"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input 
                  id="zip"
                  placeholder="85001"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Vehicle Information</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="truck-type">Truck Type</Label>
                <Select value={truckType} onValueChange={setTruckType} required>
                  <SelectTrigger id="truck-type">
                    <SelectValue placeholder="Select truck type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="box-truck">Box Truck</SelectItem>
                    <SelectItem value="semi">Semi-Truck</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="van">Cargo Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (tons)</Label>
                <Input 
                  id="capacity"
                  placeholder="10"
                  type="number"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="license">License Plate</Label>
              <Input 
                id="license"
                placeholder="ABC1234"
                required
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Vehicle Features</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="refrigeration" 
                  checked={hasRefrigeration} 
                  onCheckedChange={(checked) => setHasRefrigeration(checked as boolean)} 
                />
                <label
                  htmlFor="refrigeration"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Refrigeration Available
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="liftgate" 
                  checked={hasLiftgate} 
                  onCheckedChange={(checked) => setHasLiftgate(checked as boolean)} 
                />
                <label
                  htmlFor="liftgate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Liftgate Available
                </label>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverOnboarding;
