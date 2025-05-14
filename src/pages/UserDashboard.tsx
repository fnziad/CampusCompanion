
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Opportunity, Collaboration } from "@/types";
import { Briefcase, Users, Star } from "lucide-react";
import { OpportunityController } from "@/controllers/OpportunityController";
import { CollaborationController } from "@/controllers/CollaborationController";

// Import our new components
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { OpportunityTab } from "@/components/dashboard/OpportunityTab";
import { CollaborationTab } from "@/components/dashboard/CollaborationTab";
import { SavedTab } from "@/components/dashboard/SavedTab";

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userOpportunities, setUserOpportunities] = useState<Opportunity[]>([]);
  const [userCollaborations, setUserCollaborations] = useState<Collaboration[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          // Load user's created opportunities
          const opportunities = await OpportunityController.getOpportunities();
          const userOpps = opportunities.filter(opp => opp.postedBy === user?.id);
          setUserOpportunities(userOpps);

          // Load user's created collaborations
          const collaborations = await CollaborationController.getCollaborations();
          const userCollabs = collaborations.filter(collab => collab.createdBy === user?.id);
          setUserCollaborations(userCollabs);

          // Load saved opportunities from wishlist
          if (user?.wishlist) {
            const wishlistIds = user.wishlist || [];
            const savedOpps = await Promise.all(
              wishlistIds.map(id => OpportunityController.getOpportunityById(id))
            );
            // Filter out undefined values and cast to Opportunity[]
            setSavedOpportunities(savedOpps.filter(Boolean) as Opportunity[]);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };
      
      fetchData();
    }
  }, [isAuthenticated, navigate, user]);

  const handleRemoveSavedItem = (opportunityId: string) => {
    setSavedOpportunities(prev => prev.filter(item => item.id !== opportunityId));
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 font-heading">User Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your contributions and track responses to your content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 fade-in">
          <DashboardCard
            title="Opportunities"
            value={userOpportunities.length}
            icon={<Briefcase className="h-5 w-5 text-primary" />}
            gradient="from-primary/10 to-background"
            description={`You've posted ${userOpportunities.length} opportunities`}
          />

          <DashboardCard
            title="Collaborations"
            value={userCollaborations.length}
            icon={<Users className="h-5 w-5 text-blue-500" />}
            gradient="from-blue-500/10 to-background"
            description={`You've created ${userCollaborations.length} collaboration posts`}
          />

          <DashboardCard
            title="Saved Items"
            value={savedOpportunities.length}
            icon={<Star className="h-5 w-5 text-secondary" />}
            gradient="from-secondary/10 to-background"
            description={`You've saved ${savedOpportunities.length} items to your wishlist`}
          />
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full slide-up">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab 
              userOpportunities={userOpportunities}
              userCollaborations={userCollaborations}
              savedOpportunities={savedOpportunities}
            />
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunityTab userOpportunities={userOpportunities} />
          </TabsContent>

          <TabsContent value="collaborations">
            <CollaborationTab userCollaborations={userCollaborations} />
          </TabsContent>

          <TabsContent value="saved">
            <SavedTab 
              savedOpportunities={savedOpportunities} 
              user={user}
              onRemoveItem={handleRemoveSavedItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
