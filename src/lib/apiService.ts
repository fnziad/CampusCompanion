import coursesData from '@/data/courses.json';
import opportunitiesData from '@/data/opportunities.json';
import collaborationsData from '@/data/collaborations.json';
import resourcesData from '@/data/resources.json';
import usersData from '@/data/users.json';
import { Course, Opportunity, Collaboration, Resource, User, Application } from '@/types';
import { generateId } from '@/lib/utils';

// Type for all data collections
type DataCollection = 'courses' | 'opportunities' | 'collaborations' | 'resources' | 'users';

// In-memory database to track changes during the session
const database = {
  courses: [...coursesData] as Course[],
  opportunities: [...opportunitiesData] as Opportunity[],
  collaborations: [...collaborationsData] as Collaboration[],
  resources: [...resourcesData] as Resource[],
  users: [...usersData] as User[],
  applications: [] as Application[],
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API Service to handle CRUD operations with our "database"
 */
export const ApiService = {
  // Generic get all items from a collection
  getAll: async <T>(collection: DataCollection): Promise<T[]> => {
    await delay(300); // Simulate network delay
    return [...database[collection]] as unknown as T[];
  },

  // Get item by id from a collection
  getById: async <T extends { id: string }>(collection: DataCollection, id: string): Promise<T | undefined> => {
    await delay(200);
    return database[collection].find(item => item.id === id) as unknown as T;
  },

  // Add item to a collection
  create: async <T extends { id?: string }>(collection: DataCollection, item: T): Promise<T> => {
    await delay(500);
    const newItem = {
      ...item,
      id: item.id || generateId(),
      createdAt: new Date().toISOString(),
    };
    
    database[collection].push(newItem as any);
    return newItem as T;
  },

  // Update item in a collection
  update: async <T extends { id: string }>(collection: DataCollection, id: string, updates: Partial<T>): Promise<T | undefined> => {
    await delay(400);
    const index = database[collection].findIndex(item => item.id === id);
    
    if (index === -1) return undefined;
    
    const updatedItem = {
      ...database[collection][index],
      ...updates,
    };
    
    database[collection][index] = updatedItem;
    return updatedItem as unknown as T;
  },

  // Delete item from a collection
  delete: async (collection: DataCollection, id: string): Promise<boolean> => {
    await delay(300);
    const index = database[collection].findIndex(item => item.id === id);
    
    if (index === -1) return false;
    
    database[collection].splice(index, 1);
    return true;
  },
  
  // User specific methods
  users: {
    authenticate: async (email: string, password: string): Promise<User | null> => {
      await delay(500);
      // Modified to access email directly without checking password since it doesn't exist in User type
      const user = database.users.find(u => u.email === email);
      return user || null;
    },
    
    addToWishlist: async (userId: string, opportunityId: string): Promise<boolean> => {
      await delay(200);
      const userIndex = database.users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) return false;
      
      const user = database.users[userIndex];
      const wishlist = user.wishlist || [];
      
      if (!wishlist.includes(opportunityId)) {
        database.users[userIndex] = {
          ...user,
          wishlist: [...wishlist, opportunityId],
        };
      }
      
      return true;
    },
    
    removeFromWishlist: async (userId: string, opportunityId: string): Promise<boolean> => {
      await delay(200);
      const userIndex = database.users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) return false;
      
      const user = database.users[userIndex];
      const wishlist = user.wishlist || [];
      
      database.users[userIndex] = {
        ...user,
        wishlist: wishlist.filter(id => id !== opportunityId),
      };
      
      return true;
    },
    
    getWishlist: async (userId: string): Promise<string[]> => {
      await delay(200);
      const user = database.users.find(u => u.id === userId);
      return user?.wishlist || [];
    }
  },
  
  // Opportunity specific methods
  opportunities: {
    search: async (query: string): Promise<Opportunity[]> => {
      await delay(300);
      const searchTerm = query.toLowerCase();
      return database.opportunities.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm) ||
        opp.description.toLowerCase().includes(searchTerm) ||
        opp.field.toLowerCase().includes(searchTerm)
      );
    },
    
    filter: async (type?: string, field?: string, location?: string): Promise<Opportunity[]> => {
      await delay(300);
      let filtered = database.opportunities;
      
      if (type) {
        filtered = filtered.filter(opp => opp.type === type);
      }
      
      if (field) {
        filtered = filtered.filter(opp => opp.field === field);
      }
      
      if (location) {
        filtered = filtered.filter(opp => opp.location.includes(location));
      }
      
      return filtered;
    },
    
    applyForOpportunity: async (application: Application): Promise<boolean> => {
      await delay(500);
      database.applications.push({
        ...application,
        submittedAt: new Date().toISOString()
      });
      return true;
    }
  },
  
  // Collaboration specific methods
  collaborations: {
    getActiveCollaborations: async (): Promise<Collaboration[]> => {
      await delay(300);
      const now = new Date();
      return database.collaborations.filter(collab => {
        const deadline = new Date(collab.deadline);
        return deadline >= now;
      });
    },
    
    getUserCollaborations: async (userId: string): Promise<Collaboration[]> => {
      await delay(300);
      return database.collaborations.filter(collab => 
        collab.createdBy === userId || 
        collab.currentMembers?.some(member => member.userId === userId)
      );
    }
  }
};
