
import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Bell,
  CheckCheck,
  Truck,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "request" | "message" | "shipment" | "alert";
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest activities and alerts
          </p>
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-primary px-1 py-0 text-xs">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-2">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Bell className="mb-2 h-12 w-12 text-muted-foreground/80" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="grid gap-2">
            {notifications
              .filter((notification) => notification.type === "request")
              .map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shipments">
          <div className="grid gap-2">
            {notifications
              .filter((notification) => notification.type === "shipment")
              .map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="grid gap-2">
            {notifications
              .filter((notification) => notification.type === "message")
              .map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ 
  notification, 
  onMarkAsRead 
}: { 
  notification: Notification; 
  onMarkAsRead: (id: string) => void;
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "request":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "shipment":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className={cn(
      "transition-colors hover:bg-muted/30",
      !notification.read && "border-l-4 border-l-primary"
    )}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "font-medium",
              !notification.read && "font-semibold"
            )}>
              {notification.title}
            </h4>
            <span className="text-xs text-muted-foreground">{notification.time}</span>
          </div>
          <p className="text-sm text-muted-foreground">{notification.description}</p>
        </div>
        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Mock notification data
const notificationData: Notification[] = [
  {
    id: "notif1",
    title: "New booking request",
    description: "Michael Johnson has requested to book your shipment to Las Vegas",
    time: "5 minutes ago",
    read: false,
    type: "request"
  },
  {
    id: "notif2",
    title: "Shipment update",
    description: "Your shipment to Denver has reached the halfway point",
    time: "1 hour ago",
    read: false,
    type: "shipment"
  },
  {
    id: "notif3",
    title: "New message from Sarah",
    description: "Sarah Wilson has sent you a message about the scheduled delivery",
    time: "3 hours ago",
    read: true,
    type: "message"
  },
  {
    id: "notif4",
    title: "Request accepted",
    description: "James Smith accepted your request for the San Diego shipment",
    time: "Yesterday",
    read: true,
    type: "request"
  },
  {
    id: "notif5",
    title: "Weather alert",
    description: "Possible delays due to storm conditions on route to Los Angeles",
    time: "2 days ago",
    read: true,
    type: "alert"
  },
  {
    id: "notif6",
    title: "Shipment delivered",
    description: "Your shipment to Salt Lake City has been successfully delivered",
    time: "3 days ago",
    read: true,
    type: "shipment"
  }
];

export default Notifications;
