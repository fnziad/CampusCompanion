
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { OpportunityController } from "@/controllers/OpportunityController";
import { Opportunity } from "@/types";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { WishlistModel } from "@/models/WishlistModel";

export default function Wishlist() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated or Guest
    if (!isAuthenticated || user?.role === 'Guest') {
      navigate("/login");
      return;
    }
    
    // Fetch saved opportunities
    const fetchSavedOpportunities = async () => {
      try {
        if (user?.id) {
          const wishlistIds = await WishlistModel.getUserWishlist(user.id);
          const opportunitiesPromises = wishlistIds.map(id => 
            OpportunityController.getOpportunityById(id)
          );
          const opportunities = await Promise.all(opportunitiesPromises);
          
          // Filter out undefined values and cast to Opportunity[]
          setSavedOpportunities(opportunities.filter(Boolean) as Opportunity[]);
        }
      } catch (error) {
        console.error("Error fetching saved opportunities:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedOpportunities();
  }, [isAuthenticated, user, navigate]);

  // Function to handle removing from wishlist
  const handleRemoveFromWishlist = (opportunityId: string) => {
    if (!user?.id) return;
    
    OpportunityController.removeFromWishlist(user.id, opportunityId);
    setSavedOpportunities(prev => prev.filter(opp => opp.id !== opportunityId));
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-heading">My Wishlist</h1>
          <p className="text-muted-foreground">
            Opportunities you've saved for later
          </p>
        </div>
      </div>
      
      {savedOpportunities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="relative">
              <OpportunityCard
                opportunity={opportunity}
                showActions={false}
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveFromWishlist(opportunity.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
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
