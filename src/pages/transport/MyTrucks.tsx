
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Truck,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  User,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TruckData {
  id: string;
  registrationNo: string;
  type: string;
  capacity: string;
  fuelType: string;
  status: "Available" | "On Trip" | "Maintenance";
  driver: string | null;
  driverPhone?: string;
  driverLicense?: string;
}

const MyTrucks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [trucks, setTrucks] = useState<TruckData[]>([
    {
      id: "TRK-2045",
      registrationNo: "KA-01-HG-2045",
      type: "Container",
      capacity: "25 Tons",
      fuelType: "Diesel",
      status: "Available",
      driver: "John Doe",
      driverPhone: "555-123-4567",
      driverLicense: "DL12345678",
    },
    {
      id: "TRK-1832",
      registrationNo: "KA-05-MJ-1832",
      type: "Flatbed",
      capacity: "20 Tons",
      fuelType: "Diesel",
      status: "On Trip",
      driver: "Mike Johnson",
      driverPhone: "555-987-6543",
      driverLicense: "DL98765432",
    },
    {
      id: "TRK-9372",
      registrationNo: "KA-02-SW-9372",
      type: "10-Wheel",
      capacity: "15 Tons",
      fuelType: "Petrol",
      status: "Maintenance",
      driver: null,
    },
    {
      id: "TRK-5421",
      registrationNo: "KA-03-RB-5421",
      type: "Container",
      capacity: "30 Tons",
      fuelType: "Diesel",
      status: "On Trip",
      driver: "Robert Brown",
      driverPhone: "555-456-7890",
      driverLicense: "DL45678901",
    },
  ]);
  
  const [isAddTruckOpen, setIsAddTruckOpen] = useState(false);
  const [isEditTruckOpen, setIsEditTruckOpen] = useState(false);
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false);
  const [currentTruck, setCurrentTruck] = useState<TruckData | null>(null);
  
  // Form states for add/edit truck
  const [formData, setFormData] = useState({
    registrationNo: "",
    type: "",
    capacity: "",
    fuelType: "",
    status: "Available" as TruckData["status"],
  });

  // Form state for assigning driver
  const [driverData, setDriverData] = useState({
    name: "",
    phone: "",
    license: "",
  });

  // Drivers list for dropdown
  const availableDrivers = [
    { id: "DRV-1", name: "John Doe", phone: "555-123-4567", license: "DL12345678" },
    { id: "DRV-2", name: "Mike Johnson", phone: "555-987-6543", license: "DL98765432" },
    { id: "DRV-3", name: "Sarah Williams", phone: "555-234-5678", license: "DL23456789" },
    { id: "DRV-4", name: "Robert Brown", phone: "555-456-7890", license: "DL45678901" },
    { id: "DRV-5", name: "Emily Davis", phone: "555-678-9012", license: "DL67890123" },
  ];

  const handleAddTruck = () => {
    const newTruck: TruckData = {
      id: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      registrationNo: formData.registrationNo,
      type: formData.type,
      capacity: formData.capacity,
      fuelType: formData.fuelType,
      status: formData.status,
      driver: null,
    };
    
    setTrucks([...trucks, newTruck]);
    setIsAddTruckOpen(false);
    resetForm();
    
    toast({
      title: "Truck Added",
      description: `${newTruck.id} has been added to your fleet.`,
    });
  };

  const handleEditTruck = () => {
    if (!currentTruck) return;
    
    const updatedTrucks = trucks.map((truck) => 
      truck.id === currentTruck.id 
        ? { 
            ...truck, 
            registrationNo: formData.registrationNo,
            type: formData.type,
            capacity: formData.capacity,
            fuelType: formData.fuelType,
            status: formData.status,
          } 
        : truck
    );
    
    setTrucks(updatedTrucks);
    setIsEditTruckOpen(false);
    resetForm();
    
    toast({
      title: "Truck Updated",
      description: `${currentTruck.id} has been updated.`,
    });
  };

  const handleDeleteTruck = (id: string) => {
    setTrucks(trucks.filter(truck => truck.id !== id));
    
    toast({
      title: "Truck Deleted",
      description: `${id} has been removed from your fleet.`,
      variant: "destructive",
    });
  };

  const handleAssignDriver = () => {
    if (!currentTruck) return;
    
    const updatedTrucks = trucks.map((truck) => 
      truck.id === currentTruck.id 
        ? { 
            ...truck, 
            driver: driverData.name,
            driverPhone: driverData.phone,
            driverLicense: driverData.license,
          } 
        : truck
    );
    
    setTrucks(updatedTrucks);
    setIsAssignDriverOpen(false);
    
    toast({
      title: "Driver Assigned",
      description: `${driverData.name} has been assigned to ${currentTruck.id}.`,
    });
  };

  const resetForm = () => {
    setFormData({
      registrationNo: "",
      type: "",
      capacity: "",
      fuelType: "",
      status: "Available",
    });
    
    setDriverData({
      name: "",
      phone: "",
      license: "",
    });
    
    setCurrentTruck(null);
  };

  const openEditDialog = (truck: TruckData) => {
    setCurrentTruck(truck);
    setFormData({
      registrationNo: truck.registrationNo,
      type: truck.type,
      capacity: truck.capacity,
      fuelType: truck.fuelType,
      status: truck.status,
    });
    setIsEditTruckOpen(true);
  };

  const openAssignDriverDialog = (truck: TruckData) => {
    setCurrentTruck(truck);
    if (truck.driver) {
      setDriverData({
        name: truck.driver,
        phone: truck.driverPhone || "",
        license: truck.driverLicense || "",
      });
    }
    setIsAssignDriverOpen(true);
  };

  const filteredTrucks = trucks.filter(
    (truck) => 
      truck.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      truck.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      truck.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (truck.driver && truck.driver.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadgeColor = (status: TruckData["status"]) => {
    switch (status) {
      case "Available": return "bg-green-500";
      case "On Trip": return "bg-blue-500";
      case "Maintenance": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My Trucks</h1>
          <p className="text-muted-foreground">
            Manage your fleet and drivers
          </p>
        </div>
        
        <Dialog open={isAddTruckOpen} onOpenChange={setIsAddTruckOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Truck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Truck</DialogTitle>
              <DialogDescription>
                Enter the details of the new truck to add to your fleet.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registrationNo" className="text-right">
                  Registration
                </Label>
                <Input
                  id="registrationNo"
                  value={formData.registrationNo}
                  onChange={(e) => setFormData({...formData, registrationNo: e.target.value})}
                  placeholder="KA-01-XX-1234"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                  defaultValue={formData.type}
                >
                  <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="Select truck type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Container">Container</SelectItem>
                    <SelectItem value="Flatbed">Flatbed</SelectItem>
                    <SelectItem value="10-Wheel">10-Wheel</SelectItem>
                    <SelectItem value="Semi-Trailer">Semi-Trailer</SelectItem>
                    <SelectItem value="Tanker">Tanker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  placeholder="20 Tons"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fuelType" className="text-right">
                  Fuel Type
                </Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, fuelType: value})}
                  defaultValue={formData.fuelType}
                >
                  <SelectTrigger id="fuelType" className="col-span-3">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="CNG">CNG</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, status: value as TruckData["status"]})}
                  defaultValue={formData.status}
                >
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="On Trip">On Trip</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddTruckOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleAddTruck}>
                Add Truck
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by ID, registration, type or driver..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Trucks Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Truck Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTrucks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Truck ID</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrucks.map((truck) => (
                  <TableRow key={truck.id}>
                    <TableCell className="font-medium">{truck.id}</TableCell>
                    <TableCell>{truck.registrationNo}</TableCell>
                    <TableCell>{truck.type}</TableCell>
                    <TableCell>{truck.capacity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusBadgeColor(truck.status)}`}></div>
                        <span>{truck.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {truck.driver ? (
                        <div className="flex items-center">
                          <span>{truck.driver}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                                <AlertCircle className="h-4 w-4" />
                                <span className="sr-only">Driver details</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Driver Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label className="text-right">Name</Label>
                                  <div className="col-span-2">{truck.driver}</div>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label className="text-right">Phone</Label>
                                  <div className="col-span-2">{truck.driverPhone}</div>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label className="text-right">License</Label>
                                  <div className="col-span-2">{truck.driverLicense}</div>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label className="text-right">Truck</Label>
                                  <div className="col-span-2">{truck.id} ({truck.registrationNo})</div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          No driver assigned
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(truck)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Truck
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAssignDriverDialog(truck)}>
                            <User className="mr-2 h-4 w-4" />
                            {truck.driver ? "Reassign Driver" : "Assign Driver"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteTruck(truck.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Truck
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Truck className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No trucks found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm 
                  ? "Try adjusting your search to find what you're looking for."
                  : "Add your first truck to get started."}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => searchTerm ? setSearchTerm("") : setIsAddTruckOpen(true)}
              >
                {searchTerm ? "Clear Search" : "Add Your First Truck"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Truck Dialog */}
      <Dialog open={isEditTruckOpen} onOpenChange={setIsEditTruckOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Truck</DialogTitle>
            <DialogDescription>
              Update the details of truck {currentTruck?.id}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-registrationNo" className="text-right">
                Registration
              </Label>
              <Input
                id="edit-registrationNo"
                value={formData.registrationNo}
                onChange={(e) => setFormData({...formData, registrationNo: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, type: value})}
                value={formData.type}
              >
                <SelectTrigger id="edit-type" className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="Flatbed">Flatbed</SelectItem>
                  <SelectItem value="10-Wheel">10-Wheel</SelectItem>
                  <SelectItem value="Semi-Trailer">Semi-Trailer</SelectItem>
                  <SelectItem value="Tanker">Tanker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="edit-capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-fuelType" className="text-right">
                Fuel Type
              </Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, fuelType: value})}
                value={formData.fuelType}
              >
                <SelectTrigger id="edit-fuelType" className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, status: value as TruckData["status"]})}
                value={formData.status}
              >
                <SelectTrigger id="edit-status" className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="On Trip">On Trip</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditTruckOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditTruck}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Driver Dialog */}
      <Dialog open={isAssignDriverOpen} onOpenChange={setIsAssignDriverOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Driver</DialogTitle>
            <DialogDescription>
              Assign or reassign a driver to truck {currentTruck?.id}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Select 
              onValueChange={(value) => {
                const selectedDriver = availableDrivers.find(d => d.id === value);
                if (selectedDriver) {
                  setDriverData({
                    name: selectedDriver.name,
                    phone: selectedDriver.phone,
                    license: selectedDriver.license,
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.map(driver => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name} - {driver.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driver-name" className="text-right">
                Name
              </Label>
              <Input
                id="driver-name"
                value={driverData.name}
                onChange={(e) => setDriverData({...driverData, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driver-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="driver-phone"
                value={driverData.phone}
                onChange={(e) => setDriverData({...driverData, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driver-license" className="text-right">
                License
              </Label>
              <Input
                id="driver-license"
                value={driverData.license}
                onChange={(e) => setDriverData({...driverData, license: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAssignDriverOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAssignDriver} disabled={!driverData.name}>
              Assign Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTrucks;
