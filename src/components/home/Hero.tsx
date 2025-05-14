
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, BookOpen, FileText, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div 
          className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="max-w-xl lg:max-w-lg">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-heading">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Campus Companion
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your all-in-one platform for academic success. Access course materials, build your resume, 
              and connect with opportunities all in one place.
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              {isAuthenticated ? (
                <Link to="/courses">
                  <Button className="flex gap-2 shadow-lg hover:shadow-primary/50 transition-all">
                    Explore Tools
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="flex gap-2 shadow-lg hover:shadow-primary/50 transition-all">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/about" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div 
            className={`grid grid-cols-2 gap-4 sm:gap-6 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
          >
            <Link to="/courses" className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
              <BookOpen className="mx-auto h-10 w-10 text-primary animate-flicker-glow" />
              <h3 className="mt-4 text-base font-semibold leading-7 text-foreground">Course Hub</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Access course materials, lecture notes, and past papers.
              </p>
            </Link>
            <Link to="/resume" className="rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
              <FileText className="mx-auto h-10 w-10 text-secondary animate-flicker-glow" />
              <h3 className="mt-4 text-base font-semibold leading-7 text-foreground">Resume Maker</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create professional resumes tailored for your industry.
              </p>
            </Link>
            <Link to="/collaboration" className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
              <Users className="mx-auto h-10 w-10 text-accent animate-flicker-glow" />
              <h3 className="mt-4 text-base font-semibold leading-7 text-foreground">Study Groups</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Connect with peers for projects and study sessions.
              </p>
            </Link>
            <Link to="/opportunities" className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
              <Briefcase className="mx-auto h-10 w-10 text-primary animate-flicker-glow" />
              <h3 className="mt-4 text-base font-semibold leading-7 text-foreground">Opportunities</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Discover jobs, internships, and research openings.
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div 
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-30" 
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        />
      </div>
    </div>
  );
}
