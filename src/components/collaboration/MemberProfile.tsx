
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CollaborationMember } from "@/types";
import { Phone } from "lucide-react";

interface MemberProfileProps {
  member: CollaborationMember;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberProfile({ member, isOpen, onClose }: MemberProfileProps) {
  // Generate a fake phone number for demo purposes
  const [phoneNumber] = useState(`(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Member Profile</DialogTitle>
          <DialogDescription>
            Contact information and skills
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={member.profilePicture} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
          {member.role && (
            <Badge className={member.role === "Team Lead" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}>
              {member.role}
            </Badge>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {member.skills?.length ? (
                member.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills listed</p>
              )}
            </div>
          </div>
          
          <Card className="p-3 bg-muted/50 flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span>{phoneNumber}</span>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
