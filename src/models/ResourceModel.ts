
import resourcesData from '@/data/resources.json';
import { Resource } from '@/types';

export class ResourceModel {
  static getAllResources(): Resource[] {
    return resourcesData as Resource[];
  }

  static getResourcesByCourse(courseId: string): Resource[] {
    return (resourcesData.filter(resource => 
      resource.courseId === courseId
    ) as Resource[]);
  }

  static searchResources(query: string): Resource[] {
    const searchTerm = query.toLowerCase();
    return (resourcesData.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm)
    ) as Resource[]);
  }

  static filterResources(resources: Resource[], type?: string, sortBy?: 'date' | 'rating'): Resource[] {
    let filtered = [...resources];
    
    if (type) {
      filtered = filtered.filter(resource => resource.type === type);
    }
    
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        const avgA = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length || 0;
        const avgB = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length || 0;
        return avgB - avgA;
      });
    }
    
    return filtered;
  }
}
