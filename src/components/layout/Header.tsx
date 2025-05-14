import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { BookOpen, User, LogIn, LogOut, Menu, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Resume Maker", href: "/resume", icon: User },
  { name: "Collaboration Hub", href: "/collaboration", icon: Users },
  { name: "Opportunities", href: "/opportunities", icon: Briefcase },
];

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-accent rounded-md p-2 shadow-lg animate-flicker-glow">
              <img src="/educational-logo.svg" alt="Campus Companion Logo" className="h-8 w-8" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              Campus Companion
            </span>
          </Link>
        </div>
        
        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-6">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-md p-2 shadow-lg">
                    <img src="/educational-logo.svg" alt="Campus Companion Logo" className="h-8 w-8" />
                  </div>
                  <span className="font-heading font-bold text-xl tracking-tight">
                    CampusCompanion
                  </span>
                </Link>
                
                <div className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-2 py-2 font-medium hover:text-primary transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <Link 
                    to="/about"
                    className="flex items-center gap-2 py-2 font-medium hover:text-primary transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    About
                  </Link>
                </div>
                
                <div className="flex items-center mt-auto">
                  <ThemeToggle />
                </div>
                
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 py-2 font-medium hover:text-primary transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>Profile</span>
                    </Link>
                    <Button onClick={logout} variant="outline" className="flex gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button className="w-full flex gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 text-sm font-medium leading-6 hover:text-primary transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <Link 
            to="/about"
            className="flex items-center gap-2 text-sm font-medium leading-6 hover:text-primary transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            About
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {user?.role === 'SuperAdmin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                {(user?.role === 'SuperAdmin' || user?.role === 'Moderator') && (
                  <DropdownMenuItem asChild>
                    <Link to="/moderate">Moderation</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button className="flex gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
