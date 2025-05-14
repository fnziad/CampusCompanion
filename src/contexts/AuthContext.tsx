
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials } from "@/types";
import { toast } from "sonner";

// Simulating a backend call
import usersData from "@/data/users.json";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedUser: User) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved user session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Simulate API call delay
    setIsLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const foundUser = usersData.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (foundUser) {
          // Ensure role is one of the allowed types
          const role = (foundUser.role === 'Guest' || 
                        foundUser.role === 'Contributor' || 
                        foundUser.role === 'Moderator' || 
                        foundUser.role === 'SuperAdmin') 
                        ? foundUser.role 
                        : 'Guest' as const;
          
          const userToSave: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: role,
            profilePicture: foundUser.profilePicture || "",
            bio: foundUser.bio || "",
            socialLinks: foundUser.socialLinks || {},
            wishlist: foundUser.wishlist || []
          };
          
          setUser(userToSave);
          localStorage.setItem("user", JSON.stringify(userToSave));
          toast.success("Successfully logged in!");
          setIsLoading(false);
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      updateUserProfile,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
