
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Company registration state
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState("");
  
  // Driver registration state
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [driverConfirmPassword, setDriverConfirmPassword] = useState("");
  
  // Transport Agency registration state
  const [transportName, setTransportName] = useState("");
  const [transportEmail, setTransportEmail] = useState("");
  const [transportPassword, setTransportPassword] = useState("");
  const [transportConfirmPassword, setTransportConfirmPassword] = useState("");
  
  // Agent Driver registration state
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [agentConfirmPassword, setAgentConfirmPassword] = useState("");
  
  const handleCompanyRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (companyPassword !== companyConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", "company");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", companyEmail);
      localStorage.setItem("userName", companyName);
      localStorage.setItem("needsProfileSetup", "true");
      
      toast({
        title: "Registration Successful",
        description: "Please complete your company profile",
      });
      
      navigate("/company-onboarding");
    }, 1500);
  };
  
  const handleDriverRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (driverPassword !== driverConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", "driver");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", driverEmail);
      localStorage.setItem("userName", driverName);
      localStorage.setItem("needsProfileSetup", "true");
      
      toast({
        title: "Registration Successful",
        description: "Please complete your driver profile",
      });
      
      navigate("/driver-onboarding");
    }, 1500);
  };
  
  const handleTransportRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (transportPassword !== transportConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", "transport_agency");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", transportEmail);
      localStorage.setItem("userName", transportName);
      localStorage.setItem("needsProfileSetup", "true");
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Transport Agency Portal!",
      });
      
      navigate("/transport");
    }, 1500);
  };
  
  const handleAgentDriverRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (agentPassword !== agentConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", "agent_driver");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", agentEmail);
      localStorage.setItem("userName", agentName);
      localStorage.setItem("needsProfileSetup", "true");
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Agent Driver Portal!",
      });
      
      navigate("/agent");
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-7 w-7 text-white" strokeWidth={2} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Sign up to start using Cargo Flow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="agent">Agent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <form onSubmit={handleCompanyRegister} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name"
                    placeholder="Acme Logistics"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input 
                    id="company-email"
                    type="email"
                    placeholder="mail@example.com"
                    required
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-password">Password</Label>
                  <Input
                    id="company-password"
                    type="password"
                    required
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-confirm-password">Confirm Password</Label>
                  <Input
                    id="company-confirm-password"
                    type="password"
                    required
                    value={companyConfirmPassword}
                    onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="driver">
              <form onSubmit={handleDriverRegister} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-name">Full Name</Label>
                  <Input 
                    id="driver-name"
                    placeholder="John Doe"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input 
                    id="driver-email"
                    type="email"
                    placeholder="driver@example.com"
                    required
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-password">Password</Label>
                  <Input
                    id="driver-password"
                    type="password"
                    required
                    value={driverPassword}
                    onChange={(e) => setDriverPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-confirm-password">Confirm Password</Label>
                  <Input
                    id="driver-confirm-password"
                    type="password"
                    required
                    value={driverConfirmPassword}
                    onChange={(e) => setDriverConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="transport">
              <form onSubmit={handleTransportRegister} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="transport-name">Transport Agency Name</Label>
                  <Input 
                    id="transport-name"
                    placeholder="Speed Transport Services"
                    required
                    value={transportName}
                    onChange={(e) => setTransportName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transport-email">Email</Label>
                  <Input 
                    id="transport-email"
                    type="email"
                    placeholder="transport@example.com"
                    required
                    value={transportEmail}
                    onChange={(e) => setTransportEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transport-password">Password</Label>
                  <Input
                    id="transport-password"
                    type="password"
                    required
                    value={transportPassword}
                    onChange={(e) => setTransportPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transport-confirm-password">Confirm Password</Label>
                  <Input
                    id="transport-confirm-password"
                    type="password"
                    required
                    value={transportConfirmPassword}
                    onChange={(e) => setTransportConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="agent">
              <form onSubmit={handleAgentDriverRegister} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Full Name</Label>
                  <Input 
                    id="agent-name"
                    placeholder="Alex Smith"
                    required
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-email">Email</Label>
                  <Input 
                    id="agent-email"
                    type="email"
                    placeholder="agent@example.com"
                    required
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-phone">Phone Number</Label>
                  <Input 
                    id="agent-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    required
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-password">Password</Label>
                  <Input
                    id="agent-password"
                    type="password"
                    required
                    value={agentPassword}
                    onChange={(e) => setAgentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-confirm-password">Confirm Password</Label>
                  <Input
                    id="agent-confirm-password"
                    type="password"
                    required
                    value={agentConfirmPassword}
                    onChange={(e) => setAgentConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Note: Agent Drivers are typically managed by Transport Agencies. This registration is for independent agents.
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")} variant="link" className="h-auto p-0">
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
