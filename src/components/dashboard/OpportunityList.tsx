
import { Opportunity } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { isActive } from "@/utils/dateUtils";

type OpportunityListProps = {
  opportunities: Opportunity[];
}

export function OpportunityList({ opportunities }: OpportunityListProps) {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4">
      {opportunities.map((opportunity) => (
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
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
                <Badge variant="outline">{opportunity.type}</Badge>
                <Badge variant="outline">{opportunity.field}</Badge>
              </div>
            </div>
            <div className="bg-muted/20 p-5 flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 md:w-48">
              <div className="text-center">
                <p className="text-3xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
              <Link to={`/opportunities/${opportunity.id}`}>
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
