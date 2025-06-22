
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import DriverDashboard from "./pages/DriverDashboard";
import TransportDashboard from "./pages/transport/TransportDashboard";

// Common pages
import TruckList from "./pages/TruckList";
import TruckDetail from "./pages/TruckDetail";
import Requests from "./pages/Requests";
import Shipments from "./pages/Shipments";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LiveTracking from "./pages/LiveTracking";

// Driver pages
import Navigation from "./pages/driver/Navigation";
import Earnings from "./pages/driver/Earnings";
import Documents from "./pages/driver/Documents";
import AvailableLoads from "./pages/driver/AvailableLoads";
import MyBookings from "./pages/driver/MyBookings";

// Company pages
import PostLoad from "./pages/PostLoad";
import LoadRequests from "./pages/LoadRequests";

// Transport Agency pages
import MyTrucks from "./pages/transport/MyTrucks";

// Agent Driver pages
import AgentDashboard from "./pages/agent/AgentDashboard";
import AssignedLoad from "./pages/agent/AssignedLoad";
import PickupDropInfo from "./pages/agent/PickupDropInfo";
import ContactDetails from "./pages/agent/ContactDetails";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompanyOnboarding from "./pages/auth/CompanyOnboarding";
import DriverOnboarding from "./pages/auth/DriverOnboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/company-onboarding" element={<CompanyOnboarding />} />
            <Route path="/driver-onboarding" element={<DriverOnboarding />} />
            
            {/* Protected Company Routes */}
            <Route element={<ProtectedRoute requiredRole="company" />}>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="trucks" element={<TruckList />} />
                <Route path="trucks/:truckId" element={<TruckDetail />} />
                <Route path="post-load" element={<PostLoad />} />
                <Route path="load-requests" element={<LoadRequests />} />
                <Route path="requests" element={<Requests />} />
                <Route path="shipments" element={<Shipments />} />
                <Route path="live-tracking" element={<LiveTracking />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            
            {/* Protected Driver Routes */}
            <Route element={<ProtectedRoute requiredRole="driver" />}>
              <Route path="/driver" element={<AppLayout />}>
                <Route index element={<DriverDashboard />} />
                <Route path="loads" element={<AvailableLoads />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="navigation" element={<Navigation />} />
                <Route path="live-tracking" element={<LiveTracking />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="messages" element={<Messages />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="documents" element={<Documents />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            
            {/* Protected Transport Agency Routes */}
            <Route element={<ProtectedRoute requiredRole="transport_agency" />}>
              <Route path="/transport" element={<AppLayout />}>
                <Route index element={<TransportDashboard />} />
                <Route path="trucks" element={<MyTrucks />} />
                <Route path="shipments" element={<Shipments />} />
                <Route path="requests" element={<Requests />} />
                <Route path="loads" element={<TruckList />} />
                <Route path="live-tracking" element={<LiveTracking />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            
            {/* Protected Agent Driver Routes */}
            <Route element={<ProtectedRoute requiredRole="agent_driver" />}>
              <Route path="/agent" element={<AppLayout />}>
                <Route index element={<AgentDashboard />} />
                <Route path="assigned-load" element={<AssignedLoad />} />
                <Route path="navigation" element={<Navigation />} />
                <Route path="pickup-drop" element={<PickupDropInfo />} />
                <Route path="contact" element={<ContactDetails />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
