
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedOpportunitiesTab } from "./tabs/SavedOpportunitiesTab";
import { MyOpportunitiesTab } from "./tabs/MyOpportunitiesTab";
import { MyCollaborationsTab } from "./tabs/MyCollaborationsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { Opportunity, Collaboration, User } from "@/types";

type ProfileTabsProps = {
  user: User;
  savedOpportunities: Opportunity[];
  userOpportunities: Opportunity[];
  userCollaborations: Collaboration[];
  onDeleteOpportunity: (id: string) => void;
  onRemoveFromWishlist: (opportunityId: string) => void;
}

export function ProfileTabs({
  user,
  savedOpportunities,
  userOpportunities,
  userCollaborations,
  onDeleteOpportunity,
  onRemoveFromWishlist
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("wishlist");

  return (
    <div className="w-full md:w-2/3">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="wishlist">Saved Items</TabsTrigger>
          <TabsTrigger value="myOpportunities">My Opportunities</TabsTrigger>
          <TabsTrigger value="myCollaborations">My Collaborations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wishlist" className="animate-fade-in">
          <SavedOpportunitiesTab 
            savedOpportunities={savedOpportunities} 
            onRemoveFromWishlist={onRemoveFromWishlist}
          />
        </TabsContent>

        <TabsContent value="myOpportunities" className="animate-fade-in">
          <MyOpportunitiesTab 
            userOpportunities={userOpportunities}
            onDeleteOpportunity={onDeleteOpportunity}
          />
        </TabsContent>

        <TabsContent value="myCollaborations" className="animate-fade-in">
          <MyCollaborationsTab 
            userCollaborations={userCollaborations}
          />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
