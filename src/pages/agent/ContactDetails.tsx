
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Phone, Mail, User, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactDetails = () => {
  // In a real app, this data would come from an API
  const companyContact = {
    name: "Acme Logistics",
    contactPerson: "Sarah Johnson",
    phone: "(555) 123-8765",
    email: "sarah@acmelogistics.com",
    address: "789 Corporate Blvd, Phoenix, AZ 85001",
  };
  
  const transportContact = {
    name: "Speed Transport Services",
    contactPerson: "Mike Wilson",
    phone: "(555) 987-3456",
    email: "mike@speedtransport.com",
    address: "101 Fleet St, Phoenix, AZ 85001",
  };
  
  const loadNotes = "This cargo is time-sensitive. Must be delivered by 6 PM. Customer requests notification when driver is within 1 hour of delivery location.";
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Contact Details</h1>
      </div>
      
      <Tabs defaultValue="company">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="company">Company Contact</TabsTrigger>
          <TabsTrigger value="transport">Transport Agency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{companyContact.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contact Person</div>
                    <div className="font-medium">{companyContact.contactPerson}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone Number</div>
                    <div className="font-medium">{companyContact.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{companyContact.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{companyContact.address}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Company
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Load Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-sm">
                {loadNotes}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{transportContact.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contact Person</div>
                    <div className="font-medium">{transportContact.contactPerson}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone Number</div>
                    <div className="font-medium">{transportContact.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{transportContact.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{transportContact.address}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Transport
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 text-center">
                <div className="text-xl font-semibold mb-2">24/7 Driver Support</div>
                <div className="text-lg font-bold text-primary">1-800-CARGO-HELP</div>
                <div className="text-sm text-muted-foreground mt-2">Available for emergency assistance</div>
              </div>
              <Button variant="secondary" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Support Line
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactDetails;
