
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClockIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Collaboration } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { CollaborationController } from "@/controllers/CollaborationController";
import { toast } from "sonner";

interface ResearchProjectSectionProps {
  collaboration: Collaboration;
  styling: {
    bgColor: string;
    borderColor: string;
    badgeClass: string;
    actionText: string;
  };
}

export default function ResearchProjectSection({ collaboration, styling }: ResearchProjectSectionProps) {
  const { user } = useAuth();
  const [proposalText, setProposalText] = useState("");
  
  const handleProposalSubmit = () => {
    if (!user || !collaboration.id) {
      toast.error("You must be logged in to submit a proposal");
      return;
    }
    
    CollaborationController.submitProposal(collaboration.id, user.id, user.name, proposalText);
    toast.success("Research proposal submitted successfully!");
    setProposalText("");
  };
  
  return (
    <div className={`border-l-4 ${styling.borderColor} pl-4 py-2`}>
      <h3 className="text-lg font-semibold mb-4">Research Project Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Project Scope</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground">{collaboration.projectScope}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                <p className="text-muted-foreground">
                  {collaboration.timeline ? (
                    <>
                      {format(parseISO(collaboration.timeline.start), 'MMM d, yyyy')} to{' '}
                      {format(parseISO(collaboration.timeline.end), 'MMM d, yyyy')}
                    </>
                  ) : (
                    "Timeline not specified"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className={`mt-6 w-full bg-purple-500 hover:bg-purple-600`}>
              Submit Research Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Research Proposal</DialogTitle>
              <DialogDescription>
                Describe how you would contribute to this research project
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="proposal">Your Proposal</Label>
                <Textarea
                  id="proposal"
                  placeholder="Outline your skills, relevant experience, and how you would contribute to this research project..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  className="min-h-[150px]"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" onClick={handleProposalSubmit}>
                Submit Proposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
