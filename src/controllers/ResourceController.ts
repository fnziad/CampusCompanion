
import { Resource } from "@/types";
import resourcesData from "@/data/resources.json";
import { toast } from "sonner";

export class ResourceController {
  static getResources(): Resource[] {
    return resourcesData as Resource[];
  }

  static getResourcesByCourse(courseId: string): Resource[] {
    return resourcesData.filter(resource => resource.courseId === courseId) as Resource[];
  }

  static getApprovedResourcesByCourse(courseId: string): Resource[] {
    return resourcesData.filter(resource => resource.courseId === courseId && resource.approved) as Resource[];
  }

  static getResourceById(id: string): Resource | undefined {
    return resourcesData.find(resource => resource.id === id) as Resource | undefined;
  }

  static getFilteredResources(
    courseId: string,
    searchQuery: string = '',
    resourceType: string = '',
    sortBy: 'date' | 'rating' = 'date'
  ): Resource[] {
    let filtered = this.getResourcesByCourse(courseId);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        resource => resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
      );
    }

    // Filter by resource type
    if (resourceType) {
      filtered = filtered.filter(resource => resource.type === resourceType);
    }

    // Sort resources
    if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => {
        const aAvg = a.ratings.length ? a.ratings.reduce((acc, r) => acc + r.rating, 0) / a.ratings.length : 0;
        const bAvg = b.ratings.length ? b.ratings.reduce((acc, r) => acc + r.rating, 0) / b.ratings.length : 0;
        return bAvg - aAvg;
      });
    } else {
      filtered = filtered.sort((a, b) => 
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    }

    return filtered;
  }

  static uploadResource(resource: Partial<Resource>): void {
    // In a real app, this would make an API call to add to database
    toast.success("Resource uploaded successfully!");
  }

  static approveResource(id: string): void {
    // In a real app, this would make an API call to approve the resource
    toast.success("Resource approved successfully!");
  }

  static rejectResource(id: string): void {
    // In a real app, this would make an API call to reject the resource
    toast.success("Resource rejected successfully!");
  }

  static rateResource(resourceId: string, userId: string, rating: number, comment?: string): void {
    // In a real app, this would make an API call to add a rating
    toast.success("Rating submitted successfully!");
  }
}
