
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Users,
  Package,
  Bell,
  Calendar,
  ArrowUpRight,
  FileText,
  Map,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const TransportDashboard = () => {
  const { userName } = useAuth();
  const displayName = userName || "Transport Agency";

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Welcome, {displayName}</h1>
          <p className="text-muted-foreground">
            Manage your trucks, drivers and shipments from one central dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/transport/trucks">
              <Truck className="mr-2 h-4 w-4" />
              My Trucks
            </Link>
          </Button>
          <Button asChild>
            <Link to="/transport/loads">
              <Package className="mr-2 h-4 w-4" />
              Find Loads
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2</span> since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+3</span> since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-500">-2</span> since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500">New</span> requests today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Truck Activity</CardTitle>
            <CardDescription>
              Latest status changes and activities of your fleet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                truck: "TRK-2045",
                driver: "John Doe",
                status: "On Trip",
                statusColor: "bg-green-500",
                time: "2 hours ago",
                action: "Started trip to New York",
              },
              {
                truck: "TRK-1832",
                driver: "Mike Johnson",
                status: "Maintenance",
                statusColor: "bg-orange-500",
                time: "5 hours ago",
                action: "Scheduled for engine inspection",
              },
              {
                truck: "TRK-9372",
                driver: "Sarah Williams",
                status: "Available",
                statusColor: "bg-blue-500",
                time: "Yesterday",
                action: "Completed delivery to Chicago",
              },
              {
                truck: "TRK-5421",
                driver: "Robert Brown",
                status: "On Trip",
                statusColor: "bg-green-500",
                time: "Yesterday",
                action: "Started trip to Miami",
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${activity.statusColor}`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.truck} ({activity.driver})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{activity.status}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full" size="sm">
              View All Activity
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link to="/transport/trucks">
                  <Truck className="mb-2 h-5 w-5" />
                  <span>Add New Truck</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link to="/transport/settings">
                  <Users className="mb-2 h-5 w-5" />
                  <span>Manage Drivers</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link to="/transport/live-tracking">
                  <Map className="mb-2 h-5 w-5" />
                  <span>Track Shipments</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link to="/transport/reports">
                  <FileText className="mb-2 h-5 w-5" />
                  <span>View Reports</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  id: "SHP-3921",
                  destination: "Los Angeles, CA",
                  date: "Apr 12, 2025",
                  truck: "TRK-2045",
                },
                {
                  id: "SHP-4832",
                  destination: "Dallas, TX",
                  date: "Apr 15, 2025",
                  truck: "TRK-1832",
                },
              ].map((delivery, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div>
                    <p className="text-sm font-medium">{delivery.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {delivery.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{delivery.truck}</p>
                    <p className="text-xs text-muted-foreground">
                      {delivery.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;
