
import { Opportunity } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isActive } from "@/utils/dateUtils";

type MyOpportunitiesTabProps = {
  userOpportunities: Opportunity[];
  onDeleteOpportunity: (id: string) => void;
}

export function MyOpportunitiesTab({ userOpportunities, onDeleteOpportunity }: MyOpportunitiesTabProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">My Opportunities</h3>
      
      {userOpportunities.length > 0 ? (
        <div className="space-y-6">
          {userOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-5 flex-grow">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                        <Link to={`/opportunities/${opportunity.id}`}>{opportunity.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Posted on {new Date(opportunity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={isActive(opportunity.deadline) ? "outline" : "secondary"}>
                      {isActive(opportunity.deadline) ? "Active" : "Expired"}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="line-clamp-2">{opportunity.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{opportunity.type}</Badge>
                    <Badge variant="outline">{opportunity.field}</Badge>
                    <Badge variant="outline">{opportunity.location}</Badge>
                  </div>
                </div>
                <div className="bg-muted/20 p-5 flex flex-col md:w-48 justify-center items-center">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">Applicants</p>
                  </div>
                  <div className="space-y-2 w-full">
                    <Link to={`/opportunities/${opportunity.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => onDeleteOpportunity(opportunity.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">No opportunities posted</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            You haven't posted any opportunities yet.
          </p>
          <Button onClick={() => navigate("/opportunities/new")}>
            Post an Opportunity
          </Button>
        </div>
      )}
    </div>
  );
}
