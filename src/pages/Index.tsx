import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import JobsSection from "@/components/home/JobsSection";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, FileText, ArrowRight, LayoutDashboard, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [animationTrigger, setAnimationTrigger] = useState({
    centralLounge: false
  });
  
  useEffect(() => {
    // Animation for central lounge section
    const timeout = setTimeout(() => {
      setAnimationTrigger(prev => ({ ...prev, centralLounge: true }));
    }, 300);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Central Lounge Section - Simplified */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div 
          className={`container mx-auto px-4 transition-all duration-500 ${
            animationTrigger.centralLounge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 font-heading">Quick Access</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to succeed in one place</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link to="/courses" className="group block">
              <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Courses</h3>
                  <p className="text-muted-foreground text-sm">
                    Find materials and resources for your classes
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/collaboration" className="group block">
              <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-accent/50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Study Groups</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect with other students for collaborative learning
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/opportunities" className="group block">
              <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-secondary/50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Briefcase className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Opportunities</h3>
                  <p className="text-muted-foreground text-sm">
                    Find internships, jobs, and research positions
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/resume" className="group block">
              <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Resume Builder</h3>
                  <p className="text-muted-foreground text-sm">
                    Create professional resumes for your job search
                  </p>
                </div>
              </div>
            </Link>
            
            {isAuthenticated && (
              <Link to="/dashboard" className="group block">
                <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-blue-500/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-500/10 mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <LayoutDashboard className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage your posts and track responses
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      <FeaturedCourses />
      <JobsSection />
      {/* Removed extra social links section here; only footer will show them */}
    </div>
  );
}
