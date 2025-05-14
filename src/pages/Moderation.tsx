
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCheck, X, AlertCircle, BookOpen, FileText } from "lucide-react";
import { ResourceController } from "@/controllers/ResourceController";
import { Resource } from "@/types";

export default function Moderation() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pendingResources, setPendingResources] = useState<Resource[]>([]);
  const [reportedResources, setReportedResources] = useState<Resource[]>([]);
  
  // Redirect if not logged in as Moderator or SuperAdmin
  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'Moderator' && user?.role !== 'SuperAdmin')) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);
  
  useEffect(() => {
    // In a real app, these would be API calls
    // For now, we'll use mock data
    const mockPendingResources = [
      {
        id: "pending1",
        title: "Machine Learning Study Guide",
        description: "Comprehensive guide for ML basics",
        type: "pdf" as const,
        url: "https://example.com/ml-guide.pdf",
        courseId: "CS440",
        uploadedBy: "user001",
        uploadDate: "2025-04-22",
        approved: false,
        ratings: []
      },
      {
        id: "pending2",
        title: "Database System Lecture Notes",
        description: "Week 5-8 lecture notes",
        type: "pdf" as const,
        url: "https://example.com/db-notes.pdf",
        courseId: "CS345",
        uploadedBy: "user002",
        uploadDate: "2025-04-24",
        approved: false,
        ratings: []
      }
    ];
    
    const mockReportedResources = [
      {
        id: "reported1",
        title: "AI Tutorial Video",
        description: "Tutorial for assignment 3",
        type: "video" as const,
        url: "https://example.com/video",
        courseId: "CS440",
        uploadedBy: "user003",
        uploadDate: "2025-04-15",
        approved: true,
        ratings: [],
        reportReason: "Content not relevant to course"
      }
    ];
    
    setPendingResources(mockPendingResources);
    setReportedResources(mockReportedResources);
  }, []);
  
  const handleApprove = (resourceId: string) => {
    // Here you would make an API call to approve the resource
    toast.success("Resource approved successfully");
    setPendingResources(prev => prev.filter(resource => resource.id !== resourceId));
  };
  
  const handleReject = (resourceId: string) => {
    // Here you would make an API call to reject the resource
    toast.success("Resource rejected");
    setPendingResources(prev => prev.filter(resource => resource.id !== resourceId));
  };
  
  const handleDismissReport = (resourceId: string) => {
    toast.success("Report dismissed");
    setReportedResources(prev => prev.filter(resource => resource.id !== resourceId));
  };
  
  const handleRemoveResource = (resourceId: string) => {
    toast.success("Resource removed");
    setReportedResources(prev => prev.filter(resource => resource.id !== resourceId));
  };
  
  if (!user || (user.role !== 'Moderator' && user.role !== 'SuperAdmin')) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-heading">Content Moderation</h1>
        <p className="text-muted-foreground mb-8">Review and manage submitted resources</p>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending Approval <Badge className="ml-2">{pendingResources.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="reported">
              Reported Content <Badge className="ml-2">{reportedResources.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingResources.length > 0 ? (
              <div className="space-y-4">
                {pendingResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              Course: {resource.courseId}
                            </span>
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                              Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center" 
                            onClick={() => handleApprove(resource.id)}
                          >
                            <CheckCheck className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center text-destructive hover:bg-destructive hover:text-white" 
                            onClick={() => handleReject(resource.id)}
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">All resources are reviewed</h3>
                <p className="text-muted-foreground">There are no pending resources to approve.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reported">
            {reportedResources.length > 0 ? (
              <div className="space-y-4">
                {reportedResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <AlertCircle className="h-4 w-4 text-destructive" />
                            <span className="text-sm text-destructive">
                              {(resource as any).reportReason}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center" 
                            onClick={() => handleDismissReport(resource.id)}
                          >
                            <CheckCheck className="h-4 w-4" />
                            Dismiss
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center text-destructive hover:bg-destructive hover:text-white"
                            onClick={() => handleRemoveResource(resource.id)} 
                          >
                            <X className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No reported content</h3>
                <p className="text-muted-foreground">There are no reported resources to review.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
