
import { Collaboration } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isActive } from "@/utils/dateUtils";

type MyCollaborationsTabProps = {
  userCollaborations: Collaboration[];
}

export function MyCollaborationsTab({ userCollaborations }: MyCollaborationsTabProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">My Collaborations</h3>
      
      {userCollaborations.length > 0 ? (
        <div className="space-y-6">
          {userCollaborations.map((collaboration) => (
            <Card key={collaboration.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-5 flex-grow">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                        <Link to={`/collaboration/${collaboration.id}`}>{collaboration.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Created on {new Date(collaboration.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={isActive(collaboration.deadline) ? "outline" : "secondary"}>
                      {isActive(collaboration.deadline) ? "Active" : "Expired"}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="line-clamp-2">{collaboration.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{collaboration.type}</Badge>
                    {collaboration.academicLevel && (
                      <Badge variant="outline">{collaboration.academicLevel}</Badge>
                    )}
                    {collaboration.department && (
                      <Badge variant="outline">{collaboration.department}</Badge>
                    )}
                    {collaboration.meetingFormat && (
                      <Badge variant="outline">{collaboration.meetingFormat}</Badge>
                    )}
                  </div>
                </div>
                <div className="bg-muted/20 p-5 flex flex-col md:w-48 justify-center items-center">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold">
                      {collaboration.currentMembers?.length || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                  <div className="space-y-2 w-full">
                    <Link to={`/collaboration/${collaboration.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </Button>
                    </Link>
                    <Link to={`/collaboration/${collaboration.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-1" /> Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">No collaborations created</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            You haven't created any collaborations yet.
          </p>
          <Button onClick={() => navigate("/collaboration")}>
            Create a Collaboration
          </Button>
        </div>
      )}
    </div>
  );
}
