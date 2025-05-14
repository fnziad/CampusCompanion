
import { Opportunity, User } from "@/types";
import { Star } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { SavedItemsList } from "./SavedItemsList";

type SavedTabProps = {
  savedOpportunities: Opportunity[];
  user: User;
  onRemoveItem: (opportunityId: string) => void;
}

export function SavedTab({ savedOpportunities, user, onRemoveItem }: SavedTabProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Your Saved Items</h2>
      {savedOpportunities.length === 0 ? (
        <EmptyState
          icon={<Star className="h-6 w-6 text-muted-foreground" />}
          title="No saved items"
          description="You haven't saved any items to your wishlist yet."
          primaryAction={{
            label: "Browse Opportunities",
            link: "/opportunities"
          }}
        />
      ) : (
        <SavedItemsList 
          opportunities={savedOpportunities} 
          user={user} 
          onRemoveItem={onRemoveItem}
        />
      )}
    </div>
  );
}
