
import { Application, Opportunity } from '@/types';
import { toast } from 'sonner';
import { OpportunityModel } from '@/models/OpportunityModel';
import { WishlistModel } from '@/models/WishlistModel';
import { ApiService } from '@/lib/apiService';

export class OpportunityController {
  static async getOpportunities(): Promise<Opportunity[]> {
    try {
      return await OpportunityModel.getAllOpportunities();
    } catch (error) {
      toast.error("Failed to fetch opportunities");
      console.error("Error fetching opportunities:", error);
      return [];
    }
  }

  static async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    try {
      return await OpportunityModel.getOpportunityById(id);
    } catch (error) {
      toast.error("Failed to fetch opportunity details");
      console.error("Error fetching opportunity details:", error);
      return undefined;
    }
  }

  static async getFilteredOpportunities(
    searchQuery: string = '',
    type: string = '',
    field: string = '',
    location: string = ''
  ): Promise<Opportunity[]> {
    try {
      let opportunities: Opportunity[];
      
      if (searchQuery) {
        opportunities = await OpportunityModel.searchOpportunities(searchQuery);
      } else {
        opportunities = await OpportunityModel.filterOpportunities(type, field, location);
      }
      
      // Sort by deadline (closest first)
      opportunities.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      
      return opportunities;
    } catch (error) {
      toast.error("Failed to filter opportunities");
      console.error("Error filtering opportunities:", error);
      return [];
    }
  }

  static async createOpportunity(opportunity: Opportunity): Promise<void> {
    try {
      await OpportunityModel.createOpportunity(opportunity);
      toast.success(`Opportunity ${opportunity.title} added successfully!`);
    } catch (error) {
      toast.error("Failed to create opportunity. Please try again.");
      console.error("Error creating opportunity:", error);
    }
  }
  
  static async updateOpportunity(id: string, updates: Partial<Opportunity>): Promise<void> {
    try {
      const updated = await OpportunityModel.updateOpportunity(id, updates);
      if (updated) {
        toast.success("Opportunity updated successfully!");
      } else {
        toast.error("Opportunity not found.");
      }
    } catch (error) {
      toast.error("Failed to update opportunity. Please try again.");
      console.error("Error updating opportunity:", error);
    }
  }
  
  static async deleteOpportunity(id: string): Promise<void> {
    try {
      const success = await OpportunityModel.deleteOpportunity(id);
      if (success) {
        toast.success("Opportunity deleted successfully!");
      } else {
        toast.error("Failed to delete opportunity.");
      }
    } catch (error) {
      toast.error("Failed to delete opportunity. Please try again.");
      console.error("Error deleting opportunity:", error);
    }
  }

  static async applyForOpportunity(userId: string, opportunityId: string, application: Application): Promise<void> {
    try {
      await ApiService.opportunities.applyForOpportunity(application);
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error("Error submitting application:", error);
    }
  }

  static async saveToWishlist(userId: string, opportunityId: string): Promise<void> {
    try {
      const success = await WishlistModel.addToWishlist(userId, opportunityId);
      if (success) {
        toast.success("Added to your wishlist!");
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist. Please try again.");
      console.error("Error adding to wishlist:", error);
    }
  }

  static async removeFromWishlist(userId: string, opportunityId: string): Promise<void> {
    try {
      const success = await WishlistModel.removeFromWishlist(userId, opportunityId);
      if (success) {
        toast.success("Removed from your wishlist!");
      } else {
        toast.error("Failed to remove from wishlist.");
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist. Please try again.");
      console.error("Error removing from wishlist:", error);
    }
  }
  
  static async isInWishlist(userId: string, opportunityId: string): Promise<boolean> {
    try {
      return await WishlistModel.isInWishlist(userId, opportunityId);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      return false;
    }
  }
}
