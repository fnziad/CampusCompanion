
import { User } from "@/types";
import { LayoutDashboard, Bookmark, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type ProfileHeaderProps = {
  user: User;
  updateUserProfile: (updatedUser: User) => void;
}

export function ProfileHeader({ user, updateUserProfile }: ProfileHeaderProps) {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    profilePicture: user.profilePicture || ""
  });

  // Handle profile update
  const handleProfileUpdate = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.name,
        bio: profileData.bio,
        profilePicture: profileData.profilePicture
      };
      
      updateUserProfile(updatedUser);
      setEditProfileOpen(false);
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <div className="w-full md:w-1/3">
      <div className="bg-card rounded-lg shadow-sm p-6 text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground mb-2">{user.email}</p>
        <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium mb-4">
          {user.role}
        </div>
        <p className="text-sm text-center">{user.bio}</p>

        <div className="mt-6 space-y-3">
          <Link to="/dashboard">
            <Button variant="outline" className="w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              View Dashboard
            </Button>
          </Link>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = "/wishlist"}>
            <Bookmark className="mr-2 h-4 w-4" />
            View Saved Opportunities
          </Button>
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <UserPen className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="picture" className="text-right">
                    Profile URL
                  </label>
                  <Input
                    id="picture"
                    value={profileData.profilePicture}
                    onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
                    className="col-span-3"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bio" className="text-right">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
