
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, ClockIcon, Package } from "lucide-react";
import { Collaboration } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { CollaborationController } from "@/controllers/CollaborationController";

interface SmallTaskSectionProps {
  collaboration: Collaboration;
  styling: {
    bgColor: string;
    borderColor: string;
    badgeClass: string;
    actionText: string;
  };
}

export default function SmallTaskSection({ collaboration, styling }: SmallTaskSectionProps) {
  const { user } = useAuth();
  const [taskApplication, setTaskApplication] = useState({
    name: user?.name || "",
    email: user?.email || "",
    coverLetter: ""
  });
  
  const handleTaskApplication = () => {
    if (!user || !collaboration.id) {
      toast.error("You must be logged in to apply");
      return;
    }
    
    if (!taskApplication.coverLetter) {
      toast.error("Please provide a cover letter");
      return;
    }
    
    CollaborationController.applyForTask(collaboration.id, user.id, taskApplication);
    toast.success("Task application submitted successfully!");
    setTaskApplication({
      name: user.name || "",
      email: user.email || "",
      coverLetter: ""
    });
  };
  
  return (
    <div className={`border-l-4 ${styling.borderColor} pl-4 py-2`}>
      <h3 className="text-lg font-semibold mb-4">Task Details</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {collaboration.isPaid && (
          <Card className="bg-green-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 mr-3 text-green-600" />
                <div>
                  <h4 className="text-base font-medium">Payment</h4>
                  <p className="text-green-600 font-bold text-lg">{collaboration.paymentAmount}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Paid Task
              </Badge>
            </CardContent>
          </Card>
        )}
        
        {collaboration.estimatedHours && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center">
                <ClockIcon className="h-6 w-6 mr-3 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Estimated Time</h4>
                  <p className="text-lg">{collaboration.estimatedHours} hours</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center">
                <Package className="h-6 w-6 mr-3 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Delivery</h4>
                  <p className="text-muted-foreground">Expected by deadline</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Apply for this Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">Your Name</Label>
              <Input
                id="task-name"
                placeholder="Your full name"
                value={taskApplication.name}
                onChange={(e) => setTaskApplication({...taskApplication, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-email">Email</Label>
              <Input
                id="task-email"
                type="email"
                placeholder="Your email address"
                value={taskApplication.email}
                onChange={(e) => setTaskApplication({...taskApplication, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-cover-letter">Cover Letter</Label>
              <Textarea
                id="task-cover-letter"
                placeholder="Explain why you're suitable for this task, your experience, and any questions you have."
                value={taskApplication.coverLetter}
                onChange={(e) => setTaskApplication({...taskApplication, coverLetter: e.target.value})}
                className="min-h-[100px]"
                required
              />
            </div>
            
            <Button 
              className={`w-full bg-green-500 hover:bg-green-600`}
              onClick={handleTaskApplication}
              disabled={!taskApplication.coverLetter}
            >
              Apply for Task
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
