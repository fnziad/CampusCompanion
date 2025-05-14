
import { Opportunity } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "@/types";
import { OpportunityController } from "@/controllers/OpportunityController";
import { isActive } from "@/utils/dateUtils";

type SavedItemsListProps = {
  opportunities: Opportunity[];
  user: User;
  onRemoveItem: (opportunityId: string) => void;
}

export function SavedItemsList({ opportunities, user, onRemoveItem }: SavedItemsListProps) {
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
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
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
            <div className="bg-muted/20 p-5 flex flex-row md:flex-col justify-center items-center gap-4 md:w-48">
              <Link to={`/opportunities/${opportunity.id}`}>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  View Details
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (user) {
                    OpportunityController.removeFromWishlist(user.id, opportunity.id);
                    onRemoveItem(opportunity.id);
                  }
                }}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
