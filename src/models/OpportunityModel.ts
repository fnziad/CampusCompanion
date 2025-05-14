
import { Opportunity } from "@/types";
import { ApiService } from "@/lib/apiService";

export class OpportunityModel {
  static async getAllOpportunities(): Promise<Opportunity[]> {
    // Filter out expired opportunities
    const opportunities = await ApiService.getAll<Opportunity>('opportunities');
    const now = new Date();
    return opportunities.filter(opp => {
      const deadline = new Date(opp.deadline);
      return deadline >= now;
    });
  }

  static async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    return await ApiService.getById<Opportunity>('opportunities', id);
  }

  static async searchOpportunities(query: string): Promise<Opportunity[]> {
    return await ApiService.opportunities.search(query);
  }

  static async filterOpportunities(type?: string, field?: string, location?: string): Promise<Opportunity[]> {
    return await ApiService.opportunities.filter(type, field, location);
  }

  // For administrators to update opportunities
  static async createOpportunity(opportunity: Opportunity): Promise<Opportunity> {
    return await ApiService.create<Opportunity>('opportunities', opportunity);
  }
  
  static async updateOpportunity(id: string, updates: Partial<Opportunity>): Promise<Opportunity | undefined> {
    return await ApiService.update<Opportunity>('opportunities', id, updates);
  }
  
  static async deleteOpportunity(id: string): Promise<boolean> {
    return await ApiService.delete('opportunities', id);
  }
}
