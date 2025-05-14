
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Resource } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, FileText, Link as LinkIcon, PresentationIcon, Video } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Function to get icon based on resource type
  const getResourceIcon = () => {
    switch (resource.type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />;
      case "video":
        return <Video className="h-10 w-10 text-blue-500" />;
      case "presentation":
        return <PresentationIcon className="h-10 w-10 text-green-500" />;
      case "link":
        return <LinkIcon className="h-10 w-10 text-purple-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Calculate average rating
  const averageRating = resource.ratings.length > 0 
    ? resource.ratings.reduce((sum, rating) => sum + rating.rating, 0) / resource.ratings.length
    : 0;
  
  // Handle resource download/view
  const handleResourceAction = () => {
    // In a real app, this would redirect to the resource or download it
    window.open(resource.url, "_blank");
    toast.success("Opening resource in new tab");
  };
  
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row gap-4">
        {getResourceIcon()}
        <div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(resource.uploadDate)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs capitalize">
            {resource.type}
          </Badge>
          {!resource.approved && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
              Pending Approval
            </Badge>
          )}
        </div>
        <p className="text-sm line-clamp-2">{resource.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(true)}>
              Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{resource.title}</DialogTitle>
              <DialogDescription>
                Uploaded on {formatDate(resource.uploadDate)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>{resource.description}</p>
              
              {resource.ratings.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Ratings & Comments</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {resource.ratings.map((rating, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">User #{rating.userId.slice(-4)}</span>
                        </div>
                        {rating.comment && <p className="text-sm">{rating.comment}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleResourceAction}>
                <Download className="mr-2 h-4 w-4" />
                Access Resource
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button size="sm" onClick={handleResourceAction}>
          <Download className="mr-2 h-4 w-4" />
          Access
        </Button>
      </CardFooter>
    </Card>
  );
}
