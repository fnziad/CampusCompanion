
import { Collaboration } from "@/types";
import { Users } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { CollaborationList } from "./CollaborationList";

type CollaborationTabProps = {
  userCollaborations: Collaboration[];
}

export function CollaborationTab({ userCollaborations }: CollaborationTabProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Your Collaboration Posts</h2>
      {userCollaborations.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
          title="No collaboration posts"
          description="You haven't created any collaboration posts yet."
          primaryAction={{
            label: "Create a Collaboration Post",
            link: "/collaboration"
          }}
        />
      ) : (
        <CollaborationList collaborations={userCollaborations} />
      )}
    </div>
  );
}
