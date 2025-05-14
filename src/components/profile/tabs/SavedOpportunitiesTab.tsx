
import { Opportunity } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isActive } from "@/utils/dateUtils";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

type SavedOpportunitiesTabProps = {
  savedOpportunities: Opportunity[];
  onRemoveFromWishlist: (opportunityId: string) => void;
}

export function SavedOpportunitiesTab({ savedOpportunities, onRemoveFromWishlist }: SavedOpportunitiesTabProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Saved Opportunities</h3>
      
      {savedOpportunities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {savedOpportunities.slice(0, 4).map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
          
          {savedOpportunities.length > 4 && (
            <div className="col-span-2 text-center mt-4">
              <Button variant="outline" onClick={() => navigate("/wishlist")}>
                View All Saved Opportunities
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Bookmark className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">No saved opportunities</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            You haven't saved any opportunities to your wishlist yet.
          </p>
          <Button onClick={() => navigate("/opportunities")}>
            Browse Opportunities
          </Button>
        </div>
      )}
    </div>
  );
}
