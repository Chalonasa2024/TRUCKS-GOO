
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download,
  FileText,
  ArrowDownToLine,
  TrendingUp,
  BarChart3,
  MapPin
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define the data for the charts
const monthlyData = [
  { month: "Jan", shipments: 65, revenue: 4200 },
  { month: "Feb", shipments: 59, revenue: 3800 },
  { month: "Mar", shipments: 80, revenue: 5100 },
  { month: "Apr", shipments: 81, revenue: 5300 },
  { month: "May", shipments: 56, revenue: 3700 },
  { month: "Jun", shipments: 55, revenue: 3600 },
  { month: "Jul", shipments: 40, revenue: 2800 },
];

const shipmentTypeData = [
  { name: "Box Truck", value: 35 },
  { name: "Flatbed", value: 25 },
  { name: "Refrigerated", value: 20 },
  { name: "Semi-Trailer", value: 15 },
  { name: "Tanker", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF'];

// Interface for available reports
interface ReportItem {
  id: string;
  title: string;
  description: string;
  format: "PDF" | "CSV" | "XLSX";
  lastGenerated: string;
}

const Reports = () => {
  const [timeRange, setTimeRange] = useState("last7days");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analyze your logistics data and generate reports
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Available Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab Content */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Shipments"
              value="436"
              description="+12% from last month"
              trend="up"
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <MetricCard
              title="Revenue"
              value="$28,459"
              description="+5% from last month"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Active Drivers"
              value="24"
              description="Across 12 cities"
              trend="neutral"
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>
          
          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Shipments</CardTitle>
                <CardDescription>Number of shipments per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="shipments" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue in USD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Types</CardTitle>
                <CardDescription>Distribution by truck type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shipmentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {shipmentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 5 shipment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 border-b border-border pb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Shipment {["#45678", "#98732", "#34521", "#87652", "#12398"][i]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {["Delivered to Las Vegas", "En route to Los Angeles", "Processing at Phoenix", 
                            "Picked up from Scottsdale", "Payment confirmed"][i]}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {[
                          "2 hours ago",
                          "5 hours ago",
                          "Yesterday",
                          "2 days ago",
                          "3 days ago",
                        ][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Available Reports Tab Content */}
        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <div className="flex h-6 items-center rounded bg-primary/10 px-2 text-xs font-medium text-primary">
                      {report.format}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </span>
                  <Button variant="outline" size="sm">
                    <ArrowDownToLine className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Detailed performance metrics and business intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[400px] items-center justify-center border-2 border-dashed rounded-md">
                  <div className="text-center">
                    <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground/80" />
                    <h3 className="text-lg font-medium">Analytics Module</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Unlock advanced analytics features with our premium plan
                    </p>
                    <Button>Upgrade to Premium</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  description, 
  trend,
  icon
}: { 
  title: string; 
  value: string; 
  description: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-md bg-primary/10 p-1 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`mt-1 text-xs ${
          trend === "up" 
            ? "text-green-600" 
            : trend === "down" 
            ? "text-red-600" 
            : "text-muted-foreground"
        }`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Mock data for available reports
const availableReports: ReportItem[] = [
  {
    id: "report1",
    title: "Monthly Shipment Summary",
    description: "Overview of all shipments with key metrics",
    format: "PDF",
    lastGenerated: "Apr 05, 2025"
  },
  {
    id: "report2",
    title: "Driver Performance",
    description: "Analysis of driver efficiency and ratings",
    format: "XLSX",
    lastGenerated: "Apr 03, 2025"
  },
  {
    id: "report3",
    title: "Revenue Analysis",
    description: "Detailed breakdown of revenue by routes",
    format: "PDF",
    lastGenerated: "Mar 28, 2025"
  },
  {
    id: "report4",
    title: "Fuel Consumption",
    description: "Track and analyze fuel usage over time",
    format: "CSV",
    lastGenerated: "Mar 25, 2025"
  },
  {
    id: "report5",
    title: "Customer Satisfaction",
    description: "Survey results and feedback analysis",
    format: "PDF",
    lastGenerated: "Mar 20, 2025"
  },
  {
    id: "report6",
    title: "Route Optimization",
    description: "Analytics on route efficiency and suggestions",
    format: "XLSX",
    lastGenerated: "Mar 15, 2025"
  }
];

export default Reports;
