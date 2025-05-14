
import { Collaboration } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { isActive } from "@/utils/dateUtils";

type CollaborationListProps = {
  collaborations: Collaboration[];
}

export function CollaborationList({ collaborations }: CollaborationListProps) {
  if (collaborations.length === 0) {
    return null;
  }
  
  return (
    <div className="grid gap-4">
      {collaborations.map((collaboration) => (
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
                <Badge variant="outline">{collaboration.academicLevel}</Badge>
                {collaboration.department && (
                  <Badge variant="outline">{collaboration.department}</Badge>
                )}
                {collaboration.meetingFormat && (
                  <Badge variant="outline">{collaboration.meetingFormat}</Badge>
                )}
              </div>
            </div>
            <div className="bg-muted/20 p-5 flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 md:w-48">
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {collaboration.currentMembers?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <Link to={`/collaboration/${collaboration.id}`}>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  View Details
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
