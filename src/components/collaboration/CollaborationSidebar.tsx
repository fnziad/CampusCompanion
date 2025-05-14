
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { User, Phone } from "lucide-react";
import { Collaboration } from "@/types";

interface CollaborationSidebarProps {
  collaboration: Collaboration;
  styling: {
    borderColor: string;
  };
  phoneNumber: string;
}

export default function CollaborationSidebar({ 
  collaboration,
  styling,
  phoneNumber
}: CollaborationSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className={`border-t-4 ${styling.borderColor}`}>
        <CardHeader>
          <CardTitle>About the Poster</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Collaboration Creator</p>
            <p className="text-sm text-muted-foreground">Member since 2025</p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="w-full flex items-center justify-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-medium">{phoneNumber}</span>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Academic Level:</span>
            <Badge variant="outline">{collaboration.academicLevel}</Badge>
          </div>
          
          {collaboration.department && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Department:</span>
              <span className="text-sm font-medium">{collaboration.department}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Posted:</span>
            <span className="text-sm">{format(parseISO(collaboration.createdAt), 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Deadline:</span>
            <span className="text-sm font-medium">{format(parseISO(collaboration.deadline), 'MMM d, yyyy')}</span>
          </div>
          
          {collaboration.meetingFormat && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Meeting Format:</span>
              <span className="text-sm">{collaboration.meetingFormat}</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex items-center py-1">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">Contact: {phoneNumber}</span>
          </div>
          
          {/* Type-specific stats */}
          {collaboration.type === "Thesis Group" && collaboration.currentMembers && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Team Size:</span>
              <span className="text-sm font-medium">{collaboration.currentMembers.length}/{collaboration.maxMembers}</span>
            </div>
          )}
          
          {collaboration.type === "Research Project" && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Research Area:</span>
              <span className="text-sm font-medium">{collaboration.projectScope?.substring(0, 20)}...</span>
            </div>
          )}
          
          {collaboration.type === "Small Task" && collaboration.isPaid && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment:</span>
              <span className="text-sm font-medium text-green-600">{collaboration.paymentAmount}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
