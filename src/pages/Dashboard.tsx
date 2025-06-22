
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Bell, MapPin } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your logistics management dashboard
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +5 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 shipments today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 need immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nearby Trucks</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Within 50 miles of your location
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{activity.title}</h4>
                      <Badge variant={getActivityBadgeVariant(activity.type)}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {schedule.date.split(' ')[0]}
                    <br />
                    {schedule.date.split(' ')[1]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{schedule.title}</h4>
                    <p className="text-xs text-muted-foreground">{schedule.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper data and functions
const recentActivities = [
  {
    type: "booking",
    title: "New Booking Request",
    description: "Truck #TR-3829 requested for load from New York to Boston",
    status: "Pending",
    time: "2 hours ago"
  },
  {
    type: "delivery",
    title: "Delivery Completed",
    description: "Shipment #2937 was delivered successfully to Los Angeles warehouse",
    status: "Completed",
    time: "5 hours ago"
  },
  {
    type: "alert",
    title: "Delivery Delay",
    description: "Shipment #2411 delayed due to traffic congestion on I-95",
    status: "Delayed",
    time: "Yesterday"
  },
];

const upcomingSchedules = [
  {
    date: "Apr 07",
    title: "Pickup from Atlanta Warehouse",
    time: "09:00 AM - 11:00 AM"
  },
  {
    date: "Apr 08",
    title: "Delivery to Chicago Distribution Center",
    time: "02:00 PM - 04:00 PM"
  },
  {
    date: "Apr 10",
    title: "Fleet Maintenance Schedule",
    time: "10:00 AM - 02:00 PM"
  },
  {
    date: "Apr 12",
    title: "New Truck Onboarding",
    time: "11:30 AM - 01:30 PM"
  }
];

function getActivityIcon(type: string) {
  switch (type) {
    case "booking":
      return <Truck className="h-4 w-4 text-white" />;
    case "delivery":
      return <Package className="h-4 w-4 text-white" />;
    case "alert":
      return <Bell className="h-4 w-4 text-white" />;
    default:
      return <Package className="h-4 w-4 text-white" />;
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case "booking":
      return "bg-primary text-primary-foreground";
    case "delivery":
      return "bg-green-500 text-white";
    case "alert":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function getActivityBadgeVariant(type: string): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "booking":
      return "default";
    case "delivery":
      return "outline";
    case "alert":
      return "destructive";
    default:
      return "secondary";
  }
}

export default Dashboard;
