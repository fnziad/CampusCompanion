
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpportunityController } from "@/controllers/OpportunityController";
import { Opportunity } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  BookmarkCheck,
  Calendar, 
  MapPin, 
  Briefcase,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  FileText
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import ApplicationForm from "@/components/opportunities/ApplicationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function OpportunityDetail() {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!opportunityId) return;
    
    // Fetch opportunity details
    const fetchOpportunityDetails = async () => {
      try {
        const data = await OpportunityController.getOpportunityById(opportunityId);
        if (data) {
          setOpportunity(data);
        } else {
          // Opportunity not found, redirect to opportunities list
          navigate("/opportunities");
        }
      } catch (error) {
        console.error("Error fetching opportunity details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Check if opportunity is in user's wishlist
    const checkWishlistStatus = async () => {
      if (user?.id) {
        const saved = await OpportunityController.isInWishlist(user.id, opportunityId);
        setIsSaved(saved);
      }
    };
    
    fetchOpportunityDetails();
    if (user?.id) {
      checkWishlistStatus();
    }
  }, [opportunityId, user, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Loading opportunity details...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold mb-2">Opportunity not found</h2>
        <p className="text-muted-foreground mb-6">
          The opportunity you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/opportunities")}>
          View All Opportunities
        </Button>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Calculate days remaining until deadline
  const daysRemaining = differenceInDays(new Date(opportunity.deadline), new Date());
  const isExpired = daysRemaining < 0;
  
  // Function to get badge color based on opportunity type
  const getTypeBadge = () => {
    switch(opportunity.type) {
      case 'internship':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800 text-sm">Internship</Badge>;
      case 'research':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800 text-sm">Research</Badge>;
      case 'job':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800 text-sm">Job</Badge>;
      default:
        return <Badge variant="outline" className="text-sm">{opportunity.type}</Badge>;
    }
  };
  
  // Function to handle saving to wishlist
  const handleSaveToggle = () => {
    if (!user?.id) return;
    
    if (isSaved) {
      OpportunityController.removeFromWishlist(user.id, opportunity.id);
      setIsSaved(false);
    } else {
      OpportunityController.saveToWishlist(user.id, opportunity.id);
      setIsSaved(true);
    }
  };
  
  // Determine if user can apply (must be authenticated and have Contributor role or higher)
  const canApply = isAuthenticated && user?.role !== 'Guest' && !isExpired;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/opportunities")}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Opportunities
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {getTypeBadge()}
              <Badge variant={isExpired ? "destructive" : daysRemaining <= 3 ? "secondary" : "outline"}>
                {isExpired ? 'Expired' : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2 font-heading">{opportunity.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                {opportunity.field}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {opportunity.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Deadline: {formatDate(opportunity.deadline)}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Posted: {formatDate(opportunity.createdAt)}
              </div>
            </div>
          </div>
          
          {isAuthenticated && user?.role !== 'Guest' && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleSaveToggle}
              title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
              className="h-10 w-10"
            >
              {isSaved ? 
                <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                <Bookmark className="h-5 w-5" />
              }
            </Button>
          )}
        </div>
        
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="mb-6 whitespace-pre-line">{opportunity.description}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Eligibility</h3>
              <p className="whitespace-pre-line">{opportunity.eligibility}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How to Apply</h3>
              <p className="whitespace-pre-line">{opportunity.applicationSteps}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {canApply ? (
            <>
              <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex gap-2">
                    <FileText className="h-4 w-4" />
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Apply for {opportunity.title}</DialogTitle>
                    <DialogDescription>
                      Fill out this form to submit your application.
                    </DialogDescription>
                  </DialogHeader>
                  <ApplicationForm 
                    opportunityId={opportunity.id} 
                    onSuccess={() => setIsApplicationDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              
              {isSaved ? (
                <Button variant="outline" onClick={handleSaveToggle} className="flex gap-2">
                  <BookmarkCheck className="h-4 w-4" />
                  Saved to Wishlist
                </Button>
              ) : (
                <Button variant="outline" onClick={handleSaveToggle} className="flex gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save to Wishlist
                </Button>
              )}
            </>
          ) : isExpired ? (
            <div className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              This opportunity has expired
            </div>
          ) : !isAuthenticated ? (
            <div className="flex items-center text-muted-foreground">
              <AlertCircle className="h-5 w-5 mr-2" />
              You need to sign in to apply
            </div>
          ) : user?.role === 'Guest' ? (
            <div className="flex items-center text-muted-foreground">
              <AlertCircle className="h-5 w-5 mr-2" />
              You need contributor access to apply
            </div>
          ) : (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Ready to apply
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
