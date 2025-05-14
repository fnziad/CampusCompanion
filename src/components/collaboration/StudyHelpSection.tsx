
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { School } from "lucide-react";
import { Collaboration } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { CollaborationController } from "@/controllers/CollaborationController";

interface StudyHelpSectionProps {
  collaboration: Collaboration;
  styling: {
    bgColor: string;
    borderColor: string;
    badgeClass: string;
    actionText: string;
  };
}

export default function StudyHelpSection({ collaboration, styling }: StudyHelpSectionProps) {
  const { user } = useAuth();
  
  const handleStudyGroupJoin = () => {
    if (!user || !collaboration.id) {
      toast.error("You must be logged in to join");
      return;
    }
    
    CollaborationController.joinStudyGroup(collaboration.id, user.id);
    toast.success("You have joined the study group!");
  };
  
  return (
    <div className={`border-l-4 ${styling.borderColor} pl-4 py-2`}>
      <h3 className="text-lg font-semibold mb-4">Study Session Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Course</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center pt-0">
            <School className="h-5 w-5 mr-2 text-blue-600" />
            <p className="font-medium">{collaboration.courseName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Meeting Format</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge className="bg-blue-100 text-blue-800">
              {collaboration.meetingFormat || "Not specified"}
            </Badge>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <h3 className="text-base font-semibold mb-3">Study Goals</h3>
        <div className="flex flex-wrap gap-2">
          {collaboration.studyGoals?.map((goal, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
              {goal}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          className={`w-full bg-blue-500 hover:bg-blue-600`}
          onClick={handleStudyGroupJoin}
        >
          Join Study Group
        </Button>
      </div>
    </div>
  );
}
