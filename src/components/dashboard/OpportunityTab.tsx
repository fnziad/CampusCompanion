
import { Opportunity } from "@/types";
import { Briefcase } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { OpportunityList } from "./OpportunityList";

type OpportunityTabProps = {
  userOpportunities: Opportunity[];
}

export function OpportunityTab({ userOpportunities }: OpportunityTabProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Your Posted Opportunities</h2>
      {userOpportunities.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
          title="No opportunities posted"
          description="You haven't posted any opportunities yet."
          primaryAction={{
            label: "Post an Opportunity",
            link: "/opportunities/new"
          }}
        />
      ) : (
        <OpportunityList opportunities={userOpportunities} />
      )}
    </div>
  );
}
