
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Opportunity, Collaboration } from "@/types";
import { OpportunityController } from "@/controllers/OpportunityController";
import { CollaborationController } from "@/controllers/CollaborationController";
import { WishlistModel } from "@/models/WishlistModel";
import { toast } from "sonner";

// Component imports
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ResumeBuilderSection } from "@/components/profile/ResumeBuilderSection";

export default function Profile() {
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [userOpportunities, setUserOpportunities] = useState<Opportunity[]>([]);
  const [userCollaborations, setUserCollaborations] = useState<Collaboration[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user) {
      // Get opportunities and collaborations created by the user
      const fetchData = async () => {
        try {
          // Get all opportunities
          const opportunities = await OpportunityController.getOpportunities();
          const userOpps = opportunities.filter(opp => opp.postedBy === user.id);
          setUserOpportunities(userOpps);
          
          // Get all collaborations
          const collaborations = await CollaborationController.getCollaborations();
          const userCollabs = collaborations.filter(collab => collab.createdBy === user.id);
          setUserCollaborations(userCollabs);
          
          // Get saved opportunities
          if (user.wishlist) {
            const wishlistIds = user.wishlist || [];
            const savedOpps = await Promise.all(
              wishlistIds.map(id => OpportunityController.getOpportunityById(id))
            );
            // Filter out undefined values and cast to Opportunity[]
            setSavedOpportunities(savedOpps.filter(Boolean) as Opportunity[]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
      fetchData();
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Handle opportunity deletion
  const handleDeleteOpportunity = (id: string) => {
    OpportunityController.deleteOpportunity(id);
    setUserOpportunities(prev => prev.filter(opp => opp.id !== id));
    toast.success("Opportunity deleted successfully!");
  };

  // Handle removing an item from wishlist
  const handleRemoveFromWishlist = (opportunityId: string) => {
    if (user) {
      WishlistModel.removeFromWishlist(user.id, opportunityId);
      setSavedOpportunities(prev => prev.filter(opp => opp.id !== opportunityId));
      toast.success("Item removed from wishlist!");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileHeader 
          user={user} 
          updateUserProfile={updateUserProfile} 
        />
        
        <ProfileTabs
          user={user}
          savedOpportunities={savedOpportunities}
          userOpportunities={userOpportunities}
          userCollaborations={userCollaborations}
          onDeleteOpportunity={handleDeleteOpportunity}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      </div>
      
      <ResumeBuilderSection />
    </div>
  );
}
