
import { Collaboration, CollaborationType } from '@/types';
import { toast } from 'sonner';
import { ApiService } from '@/lib/apiService';

export class CollaborationController {
  static async getCollaborations(): Promise<Collaboration[]> {
    try {
      return await ApiService.collaborations.getActiveCollaborations();
    } catch (error) {
      console.error("Error fetching collaborations:", error);
      toast.error("Failed to load collaborations");
      return [];
    }
  }

  static async getCollaborationById(id: string): Promise<Collaboration | undefined> {
    try {
      return await ApiService.getById<Collaboration>('collaborations', id);
    } catch (error) {
      console.error("Error fetching collaboration:", error);
      toast.error("Failed to load collaboration details");
      return undefined;
    }
  }

  static async getFilteredCollaborations(
    searchQuery: string = '',
    type: string = ''
  ): Promise<Collaboration[]> {
    try {
      const collaborations = await this.getCollaborations();
      let filtered = [...collaborations];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          collab => collab.title.toLowerCase().includes(query) ||
            collab.description.toLowerCase().includes(query) ||
            collab.requiredSkills.some(skill => skill.toLowerCase().includes(query))
        );
      }

      // Filter by type
      if (type && type !== 'all') {
        filtered = filtered.filter(collab => collab.type === type);
      }

      return filtered;
    } catch (error) {
      console.error("Error filtering collaborations:", error);
      toast.error("Failed to filter collaborations");
      return [];
    }
  }

  static async getCollaborationsByType(type: CollaborationType): Promise<Collaboration[]> {
    try {
      const collaborations = await this.getCollaborations();
      return collaborations.filter(collab => collab.type === type);
    } catch (error) {
      console.error("Error fetching collaborations by type:", error);
      toast.error("Failed to load collaborations");
      return [];
    }
  }

  static async addCollaboration(collaboration: Collaboration): Promise<void> {
    try {
      await ApiService.create<Collaboration>('collaborations', collaboration);
      toast.success(`Collaboration post "${collaboration.title}" created successfully!`);
    } catch (error) {
      console.error("Error creating collaboration:", error);
      toast.error("Failed to create collaboration");
    }
  }
  
  static async submitJoinRequest(collaborationId: string, userId: string, message: string): Promise<void> {
    try {
      const collaboration = await ApiService.getById<Collaboration>('collaborations', collaborationId);
      if (!collaboration) {
        toast.error("Collaboration not found");
        return;
      }
      
      // Here you would update the collaboration with the join request
      // For now, just show a success toast
      toast.success("Join request submitted successfully!");
    } catch (error) {
      console.error("Error submitting join request:", error);
      toast.error("Failed to submit join request");
    }
  }
  
  static async joinStudyGroup(collaborationId: string, userId: string): Promise<void> {
    try {
      const collaboration = await ApiService.getById<Collaboration>('collaborations', collaborationId);
      if (!collaboration) {
        toast.error("Study group not found");
        return;
      }
      
      // Here you would update the collaboration with the new member
      // For now, just show a success toast
      toast.success("You have joined the study group successfully!");
    } catch (error) {
      console.error("Error joining study group:", error);
      toast.error("Failed to join study group");
    }
  }
  
  static async submitProposal(collaborationId: string, userId: string, name: string, proposal: string): Promise<void> {
    try {
      const collaboration = await ApiService.getById<Collaboration>('collaborations', collaborationId);
      if (!collaboration) {
        toast.error("Research project not found");
        return;
      }
      
      // Here you would update the collaboration with the new proposal
      // For now, just show a success toast
      toast.success("Research proposal submitted successfully!");
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error("Failed to submit proposal");
    }
  }
  
  static async applyForTask(collaborationId: string, userId: string, application: any): Promise<void> {
    try {
      const collaboration = await ApiService.getById<Collaboration>('collaborations', collaborationId);
      if (!collaboration) {
        toast.error("Task not found");
        return;
      }
      
      // Here you would update the collaboration with the new application
      // For now, just show a success toast
      toast.success("Task application submitted successfully!");
    } catch (error) {
      console.error("Error applying for task:", error);
      toast.error("Failed to apply for task");
    }
  }
  
  static async getDepartments(): Promise<string[]> {
    try {
      const collaborations = await ApiService.getAll<Collaboration>('collaborations');
      const departments = collaborations
        .filter(collab => collab.department)
        .map(collab => collab.department as string);
      
      return [...new Set(departments)];
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  }
}
