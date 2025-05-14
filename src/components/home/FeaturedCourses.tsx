
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import coursesData from "@/data/courses.json";
import { useEffect, useState } from "react";

export default function FeaturedCourses() {
  // Get 3 featured courses
  const featuredCourses: Course[] = coursesData.slice(0, 3);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the current element to observe
    const element = document.getElementById("featured-courses");
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="featured-courses" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">Featured Courses</h2>
            <p className="text-muted-foreground">Explore popular courses with shared resources</p>
          </div>
          <Link to="/courses" className="group flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>View all courses</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div 
          className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {featuredCourses.map((course, index) => (
            <Link 
              to={`/courses/${course.id}`} 
              key={course.id} 
              className="block transition-all"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/50">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                  />
                  <Badge className="absolute top-2 right-2">
                    {course.department}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {course.code}
                    </Badge>
                  </div>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-1 h-4 w-4" />
                    {course.resourceCount} resources
                  </div>
                  <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">View course →</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
