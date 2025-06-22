
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  FileIcon, 
  FileTextIcon, 
  FileBadgeIcon, 
  FileCheckIcon, 
  UploadIcon, 
  EyeIcon, 
  DownloadIcon, 
  CalendarIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample documents data for demonstration
const requiredDocuments = [
  { id: 1, name: "Driver's License", status: "Valid", uploadDate: "Jan 15, 2025", expiryDate: "Jan 15, 2027", verified: true },
  { id: 2, name: "Vehicle Insurance", status: "Valid", uploadDate: "Feb 10, 2025", expiryDate: "Feb 10, 2026", verified: true },
  { id: 3, name: "Commercial Driving Permit", status: "Valid", uploadDate: "Mar 05, 2025", expiryDate: "Mar 05, 2028", verified: true },
  { id: 4, name: "Vehicle Registration", status: "Expiring Soon", uploadDate: "Apr 20, 2024", expiryDate: "May 20, 2025", verified: true },
  { id: 5, name: "Medical Certificate", status: "Missing", uploadDate: "", expiryDate: "", verified: false },
];

const shipmentDocuments = [
  { id: 1, shipmentId: "SH-7823", name: "Delivery Receipt", date: "Apr 05, 2025", type: "PDF", size: "156 KB" },
  { id: 2, shipmentId: "SH-7789", name: "Bill of Lading", date: "Apr 01, 2025", type: "PDF", size: "235 KB" },
  { id: 3, shipmentId: "SH-7712", name: "Proof of Delivery", date: "Mar 28, 2025", type: "PDF", size: "124 KB" },
  { id: 4, shipmentId: "SH-7698", name: "Inspection Report", date: "Mar 25, 2025", type: "PDF", size: "348 KB" },
  { id: 5, shipmentId: "SH-7645", name: "Weight Certificate", date: "Mar 20, 2025", type: "PDF", size: "97 KB" },
];

const DocumentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Valid":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircleIcon className="mr-1 h-3 w-3" /> {status}
        </Badge>
      );
    case "Expiring Soon":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <ClockIcon className="mr-1 h-3 w-3" /> {status}
        </Badge>
      );
    case "Missing":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircleIcon className="mr-1 h-3 w-3" /> {status}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Documents() {
  const [activeTab, setActiveTab] = useState("required");
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">Manage all your documents in one place</p>
      </div>

      <Tabs defaultValue="required" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="required">Required Documents</TabsTrigger>
          <TabsTrigger value="shipment">Shipment Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="required" className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold">Driver & Vehicle Documents</h2>
              <p className="text-sm text-muted-foreground">Keep your documents up to date to avoid service interruptions</p>
            </div>
            <Button>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload New Document
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Document</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    {!isMobile && (
                      <>
                        <th className="text-left py-3 px-4 font-medium">Upload Date</th>
                        <th className="text-left py-3 px-4 font-medium">Expiry Date</th>
                      </>
                    )}
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {requiredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 rounded-md bg-primary/10">
                            <FileTextIcon className="h-4 w-4 text-primary" />
                          </Avatar>
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <DocumentStatusBadge status={doc.status} />
                      </td>
                      {!isMobile && (
                        <>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {doc.uploadDate || "Not uploaded"}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {doc.expiryDate || "N/A"}
                          </td>
                        </>
                      )}
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {doc.status !== "Missing" ? (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <DownloadIcon className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              <UploadIcon className="mr-1 h-4 w-4" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipment" className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold">Shipment Documents</h2>
              <p className="text-sm text-muted-foreground">Access and manage your shipment-related documents</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shipmentDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/30 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md bg-primary/10">
                        <FileIcon className="h-5 w-5 text-primary" />
                      </Avatar>
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Shipment #{doc.shipmentId}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.type}</Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        {doc.date}
                      </div>
                      <div className="text-muted-foreground">{doc.size}</div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const FilterIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
