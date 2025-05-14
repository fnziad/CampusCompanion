
import { ApiService } from "@/lib/apiService";

export class WishlistModel {
  static async getUserWishlist(userId: string): Promise<string[]> {
    return await ApiService.users.getWishlist(userId);
  }
  
  static async addToWishlist(userId: string, opportunityId: string): Promise<boolean> {
    return await ApiService.users.addToWishlist(userId, opportunityId);
  }
  
  static async removeFromWishlist(userId: string, opportunityId: string): Promise<boolean> {
    return await ApiService.users.removeFromWishlist(userId, opportunityId);
  }
  
  static async isInWishlist(userId: string, opportunityId: string): Promise<boolean> {
    const wishlist = await this.getUserWishlist(userId);
    return wishlist.includes(opportunityId);
  }
}
