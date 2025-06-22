
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, TrendingUpIcon, WalletIcon, BarChart3Icon, CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample earnings data for demonstration
const weeklyEarnings = [
  { day: "Mon", amount: 185 },
  { day: "Tue", amount: 240 },
  { day: "Wed", amount: 320 },
  { day: "Thu", amount: 280 },
  { day: "Fri", amount: 350 },
  { day: "Sat", amount: 290 },
  { day: "Sun", amount: 0 },
];

const recentPayments = [
  { id: 1, date: "Apr 05, 2025", amount: 1420.80, status: "Paid", shipments: 8 },
  { id: 2, date: "Mar 29, 2025", amount: 1680.50, status: "Paid", shipments: 9 },
  { id: 3, date: "Mar 22, 2025", amount: 1250.25, status: "Paid", shipments: 7 },
  { id: 4, date: "Mar 15, 2025", amount: 1545.00, status: "Paid", shipments: 8 },
];

export default function Earnings() {
  const [period, setPeriod] = useState("weekly");
  const isMobile = useIsMobile();
  
  // Earnings summary metrics
  const earnings = {
    weekly: { total: 1665, previous: 1520, shipments: 9, pending: 320 },
    monthly: { total: 6750, previous: 6200, shipments: 36, pending: 420 },
    yearly: { total: 78500, previous: 72400, shipments: 432, pending: 850 }
  };

  const currentEarnings = earnings[period as keyof typeof earnings];
  const percentChange = ((currentEarnings.total - currentEarnings.previous) / currentEarnings.previous * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">Manage your earnings and track your payment history</p>
      </div>

      {/* Period Selection */}
      <Tabs defaultValue="weekly" className="w-full" onValueChange={(value) => setPeriod(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Earnings</CardDescription>
              <CardTitle className="text-2xl flex items-baseline">
                ${currentEarnings.total.toLocaleString()}
                <span className={`ml-2 text-sm ${percentChange.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {percentChange.startsWith('-') ? '' : '+'}
                  {percentChange}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                vs ${currentEarnings.previous.toLocaleString()} previous period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Shipments Completed</CardDescription>
              <CardTitle className="text-2xl">{currentEarnings.shipments}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <TrendingUpIcon className="inline h-3 w-3 mr-1" />
                {period === "weekly" ? "This week" : period === "monthly" ? "This month" : "This year"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Payment</CardDescription>
              <CardTitle className="text-2xl">${currentEarnings.pending.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                To be processed on next payout
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Weekly Goal</CardDescription>
              <CardTitle className="text-2xl">$2,000</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(currentEarnings.total / 2000) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-2">
                {((currentEarnings.total / 2000) * 100).toFixed(0)}% of weekly target
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {/* Earnings Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Overview</CardTitle>
                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2 pt-4 px-2">
                {weeklyEarnings.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/10 rounded-t-md relative h-36">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-primary rounded-t-md"
                        style={{ height: `${(day.amount / 350) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-xs">${day.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Payments</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.slice(0, 4).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">${payment.amount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{payment.date} • {payment.shipments} shipments</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                        {payment.status}
                      </span>
                      <DownloadIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary hover:underline flex items-center justify-center gap-1">
                <CalendarIcon className="h-3 w-3" /> View All Payments
              </button>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
