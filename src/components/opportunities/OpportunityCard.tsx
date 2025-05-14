
import { Opportunity } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Calendar, MapPin, Briefcase } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { OpportunityController } from "@/controllers/OpportunityController";
import { useState, useEffect } from "react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  showActions?: boolean;
}

export default function OpportunityCard({ opportunity, showActions = true }: OpportunityCardProps) {
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user?.id && opportunity.id) {
        try {
          const savedStatus = await OpportunityController.isInWishlist(user.id, opportunity.id);
          setIsSaved(savedStatus);
        } catch (error) {
          console.error("Error checking wishlist status:", error);
        }
      }
    };

    if (isAuthenticated && user) {
      checkWishlistStatus();
    }
  }, [user, opportunity.id, isAuthenticated]);

  // Function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Calculate days remaining until deadline
  const daysRemaining = differenceInDays(new Date(opportunity.deadline), new Date());

  // Function to get badge styles based on opportunity type
  const getTypeBadge = () => {
    switch(opportunity.type) {
      case 'internship':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800">Internship</Badge>;
      case 'research':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800">Research</Badge>;
      case 'job':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800">Job</Badge>;
      default:
        return <Badge variant="outline">{opportunity.type}</Badge>;
    }
  };
  
  // Function to handle saving to wishlist
  const handleSaveToggle = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      if (isSaved) {
        await OpportunityController.removeFromWishlist(user.id, opportunity.id);
        setIsSaved(false);
      } else {
        await OpportunityController.saveToWishlist(user.id, opportunity.id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col card-hover">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
          {getTypeBadge()}
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Briefcase className="mr-1 h-4 w-4" />
          {opportunity.field}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          {opportunity.location}
        </div>
        <p className="line-clamp-2 text-sm">{opportunity.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Deadline: {formatDate(opportunity.deadline)}</span>
            {daysRemaining <= 7 && (
              <Badge variant={daysRemaining <= 3 ? "destructive" : "secondary"} className="text-xs">
                {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {showActions && isAuthenticated && user?.role !== 'Guest' && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSaveToggle}
              title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
              disabled={isLoading}
            >
              {isSaved ? 
                <BookmarkCheck className="h-4 w-4 text-primary" /> : 
                <Bookmark className="h-4 w-4" />
              }
            </Button>
          )}
          <Link to={`/opportunities/${opportunity.id}`}>
            <Button variant="secondary" size="sm">View Details</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
