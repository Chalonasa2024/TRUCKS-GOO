
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Check, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const DriverDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shipments and track your earnings
          </p>
        </div>
      </div>

      {/* Driver Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Loads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Matching your truck specification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 pickup scheduled today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,240</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,451 mi</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Shipment and Nearby Loads */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Current Shipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Shipment #3892</h3>
                <Badge className="bg-green-500">In Transit</Badge>
              </div>
              
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="font-medium">Atlanta Warehouse</p>
                  <p className="text-sm">221 Marietta St, Atlanta, GA</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Delivery</p>
                  <p className="font-medium">Chicago Distribution Center</p>
                  <p className="text-sm">335 S Franklin St, Chicago, IL</p>
                </div>
              </div>
              
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-medium">724 miles</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Time</p>
                  <p className="font-medium">11 hours 30 minutes</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <p className="font-medium">$1,450</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Navigate
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Report Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Nearby Loads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyLoads.map((load, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {load.distance}
                    <span className="text-xs">mi</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{load.location}</h4>
                      <span className="text-sm font-semibold text-primary">${load.pay}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{load.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{load.company}</p>
                  </div>
                </div>
              ))}
              <Link to="/driver/loads">
                <Button variant="outline" size="sm" className="w-full">
                  View All Available Loads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper data
const nearbyLoads = [
  {
    distance: "12",
    location: "Phoenix, AZ",
    pay: "820",
    description: "Electronics - 6,500 lbs - Ready now",
    company: "TechShip Inc."
  },
  {
    distance: "27",
    location: "Scottsdale, AZ",
    pay: "650",
    description: "Furniture - 4,200 lbs - Tomorrow",
    company: "Home Logistics Co."
  },
  {
    distance: "35",
    location: "Mesa, AZ",
    pay: "940",
    description: "Auto Parts - 8,300 lbs - Ready now",
    company: "AutoMove Carriers"
  }
];

export default DriverDashboard;
