
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollaborationMember, Collaboration } from "@/types";
import { toast } from "sonner";
import { CollaborationController } from "@/controllers/CollaborationController";
import { useAuth } from "@/contexts/AuthContext";
import { Phone } from "lucide-react";

interface ThesisGroupSectionProps {
  collaboration: Collaboration;
  isUserMember: boolean;
  handleMemberClick: (member: CollaborationMember) => void;
  styling: {
    bgColor: string;
    borderColor: string;
    badgeClass: string;
    actionText: string;
  };
}

export default function ThesisGroupSection({ 
  collaboration, 
  isUserMember, 
  handleMemberClick, 
  styling 
}: ThesisGroupSectionProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  
  const handleJoinRequest = () => {
    if (!user || !collaboration.id) {
      toast.error("You must be logged in to join");
      return;
    }
    
    CollaborationController.submitJoinRequest(collaboration.id, user.id, message);
    toast.success("Join request submitted successfully!");
    setMessage("");
  };

  return (
    <div className={`border-l-4 ${styling.borderColor} pl-4 py-2`}>
      <h3 className="text-lg font-semibold mb-4">Thesis Group Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Topic</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground">{collaboration.thesisTopic}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Department</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground">{collaboration.department}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Team members section */}
      {collaboration.currentMembers && (
        <div className="mt-6">
          <h3 className="text-base font-semibold mb-3">Current Team</h3>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                Team Capacity: 
              </span>
              <span className="text-sm font-medium">
                {collaboration.currentMembers.length}/{collaboration.maxMembers}
              </span>
            </div>
            <Progress 
              value={(collaboration.currentMembers.length / (collaboration.maxMembers || 1)) * 100} 
              className="h-2 w-24" 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {collaboration.currentMembers.map((member, index) => (
              <Card 
                key={index} 
                className="flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleMemberClick(member)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={member.profilePicture} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h4 className="font-medium text-sm">{member.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {member.role === "Team Lead" ? (
                      <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800">
                        Team Lead
                      </Badge>
                    ) : (
                      <span>Member</span>
                    )}
                    {member.skills?.length && (
                      <span className="ml-2">• {member.skills[0]}{member.skills.length > 1 ? ` +${member.skills.length - 1}` : ''}</span>
                    )}
                  </div>
                </div>
                <div className="ml-2 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
              </Card>
            ))}
          </div>
          
          {!isUserMember && collaboration.currentMembers.length < (collaboration.maxMembers || 4) && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className={`mt-4 w-full bg-amber-500 hover:bg-amber-600`}>
                  Request to Join
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Thesis Group</DialogTitle>
                  <DialogDescription>
                    Share your qualifications and why you'd like to join this thesis group
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Qualification & Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your skills, experience, and why you'd be a good fit for this thesis group..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" onClick={handleJoinRequest}>
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
}
