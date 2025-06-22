
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
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Company login state
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  
  // Driver login state
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  
  // Transport Agency login state
  const [transportEmail, setTransportEmail] = useState("");
  const [transportPassword, setTransportPassword] = useState("");
  
  // Agent Driver login state
  const [agentEmail, setAgentEmail] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  
  const handleCompanyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      login(companyEmail, companyPassword, "company");
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Cargo Flow!",
      });
    }, 1500);
  };
  
  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      login(driverEmail, driverPassword, "driver");
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Cargo Flow!",
      });
    }, 1500);
  };

  const handleTransportLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      login(transportEmail, transportPassword, "transport_agency");
      
      toast({
        title: "Login Successful",
        description: "Welcome to Transport Agency Portal!",
      });
    }, 1500);
  };
  
  const handleAgentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      login(agentEmail, agentPassword, "agent_driver");
      
      toast({
        title: "Login Successful",
        description: "Welcome to Agent Driver Portal!",
      });
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
          <CardTitle className="text-2xl font-bold">Cargo Flow</CardTitle>
          <CardDescription>
            Sign in to your account to continue
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
              <form onSubmit={handleCompanyLogin} className="space-y-4 pt-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="company-password">Password</Label>
                    <Button type="button" variant="link" className="h-auto p-0 text-xs">
                      Forgot Password?
                    </Button>
                  </div>
                  <Input
                    id="company-password"
                    type="password"
                    required
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="driver">
              <form onSubmit={handleDriverLogin} className="space-y-4 pt-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-password">Password</Label>
                    <Button type="button" variant="link" className="h-auto p-0 text-xs">
                      Forgot Password?
                    </Button>
                  </div>
                  <Input
                    id="driver-password"
                    type="password"
                    required
                    value={driverPassword}
                    onChange={(e) => setDriverPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="transport">
              <form onSubmit={handleTransportLogin} className="space-y-4 pt-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transport-password">Password</Label>
                    <Button type="button" variant="link" className="h-auto p-0 text-xs">
                      Forgot Password?
                    </Button>
                  </div>
                  <Input
                    id="transport-password"
                    type="password"
                    required
                    value={transportPassword}
                    onChange={(e) => setTransportPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="agent">
              <form onSubmit={handleAgentLogin} className="space-y-4 pt-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="agent-password">Password</Label>
                    <Button type="button" variant="link" className="h-auto p-0 text-xs">
                      Forgot Password?
                    </Button>
                  </div>
                  <Input
                    id="agent-password"
                    type="password"
                    required
                    value={agentPassword}
                    onChange={(e) => setAgentPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button onClick={() => navigate("/register")} variant="link" className="h-auto p-0">
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
