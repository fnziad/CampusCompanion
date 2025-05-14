
import { Opportunity, Collaboration } from "@/types";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "./ActivityCard";
import { EmptyState } from "./EmptyState";
import { isActive } from "@/utils/dateUtils";

type OverviewTabProps = {
  userOpportunities: Opportunity[];
  userCollaborations: Collaboration[];
  savedOpportunities: Opportunity[];
}

export function OverviewTab({ userOpportunities, userCollaborations, savedOpportunities }: OverviewTabProps) {
  const isEmpty = userOpportunities.length === 0 && userCollaborations.length === 0 && savedOpportunities.length === 0;

  if (isEmpty) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <EmptyState
          icon={<Clock className="h-6 w-6 text-muted-foreground" />}
          title="No activity yet"
          description="Start by posting an opportunity, creating a collaboration, or saving items to your wishlist."
          primaryAction={{
            label: "Post an Opportunity",
            link: "/opportunities/new"
          }}
          secondaryAction={{
            label: "Create a Collaboration",
            link: "/collaboration"
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userOpportunities.slice(0, 2).map((opportunity) => (
          <ActivityCard
            key={opportunity.id}
            title={opportunity.title}
            date={new Date(opportunity.createdAt).toLocaleDateString()}
            type="opportunity"
            status={isActive(opportunity.deadline) ? "Active" : "Expired"}
            link={`/opportunities/${opportunity.id}`}
          />
        ))}
        
        {userCollaborations.slice(0, 2).map((collaboration) => (
          <ActivityCard
            key={collaboration.id}
            title={collaboration.title}
            date={new Date(collaboration.createdAt).toLocaleDateString()}
            type="collaboration"
            status={isActive(collaboration.deadline) ? "Active" : "Expired"}
            link={`/collaboration/${collaboration.id}`}
          />
        ))}

        {savedOpportunities.slice(0, 2).map((opportunity) => (
          <ActivityCard
            key={opportunity.id}
            title={opportunity.title}
            date={new Date(opportunity.createdAt).toLocaleDateString()}
            type="saved"
            status={isActive(opportunity.deadline) ? "Active" : "Expired"}
            link={`/opportunities/${opportunity.id}`}
          />
        ))}
      </div>
    </div>
  );
}
