import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CourseController } from '@/controllers/CourseController';
import { ResourceController } from '@/controllers/ResourceController';
import ResourceFilters from '@/components/courses/ResourceFilters';
import ResourceSearch from '@/components/courses/ResourceSearch';
import { Course, Resource } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Plus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "@/components/resources/ResourceCard";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import NotFound from "./NotFound";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isAuthenticated } = useAuth();
  
  const [course, setCourse] = useState<Course | undefined>();
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  useEffect(() => {
    if (courseId) {
      const { course, resources } = CourseController.getCourseWithResources(courseId);
      setCourse(course);
      setResources(resources);
    }
  }, [courseId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (courseId) {
      const filtered = ResourceController.getFilteredResources(courseId, query, resourceType, sortBy);
      setResources(filtered);
    }
  };

  const handleTypeFilter = (type: string) => {
    setResourceType(type);
    if (courseId) {
      const filtered = ResourceController.getFilteredResources(courseId, searchQuery, type, sortBy);
      setResources(filtered);
    }
  };

  const handleSort = (sort: 'date' | 'rating') => {
    setSortBy(sort);
    if (courseId) {
      const filtered = ResourceController.getFilteredResources(courseId, searchQuery, resourceType, sort);
      setResources(filtered);
    }
  };

  // Filter approved resources for non-moderators/non-admins
  const visibleResources = user?.role === 'Moderator' || user?.role === 'SuperAdmin' 
    ? resources 
    : resources.filter(r => r.approved);
  
  // Handle if course not found
  if (!course) {
    return <NotFound />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link to="/courses" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold font-heading">{course.title}</h1>
                <Badge variant="outline" className="text-sm">
                  {course.code}
                </Badge>
              </div>
              <p className="text-muted-foreground">{course.instructor}</p>
            </div>
            
            {isAuthenticated && user?.role !== 'Guest' && (
              <Link to={`/courses/${courseId}/upload`}>
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Resource
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Course Description</h2>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Resources ({visibleResources.length})</TabsTrigger>
                <TabsTrigger value="pdf">Documents</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {visibleResources.length > 0 ? (
                  <div className="grid gap-4">
                    {visibleResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <h3 className="text-lg font-medium">No resources available</h3>
                    <p className="text-muted-foreground mb-4">Be the first to share study materials for this course.</p>
                    
                    {isAuthenticated && user?.role !== 'Guest' && (
                      <Link to={`/courses/${courseId}/upload`}>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Upload Resource
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pdf" className="mt-4">
                {visibleResources.filter(r => r.type === 'pdf').length > 0 ? (
                  <div className="grid gap-4">
                    {visibleResources
                      .filter(r => r.type === 'pdf')
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium">No documents available</h3>
                    <p className="text-muted-foreground">Try another category or upload one yourself.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="video" className="mt-4">
                {visibleResources.filter(r => r.type === 'video').length > 0 ? (
                  <div className="grid gap-4">
                    {visibleResources
                      .filter(r => r.type === 'video')
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium">No videos available</h3>
                    <p className="text-muted-foreground">Try another category or upload one yourself.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="other" className="mt-4">
                {visibleResources.filter(r => !['pdf', 'video'].includes(r.type)).length > 0 ? (
                  <div className="grid gap-4">
                    {visibleResources
                      .filter(r => !['pdf', 'video'].includes(r.type))
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium">No other resources available</h3>
                    <p className="text-muted-foreground">Try another category or upload one yourself.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Course Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Course Code</h3>
                  <p>{course.code}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p>{course.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Instructor</h3>
                  <p>{course.instructor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Resources</h3>
                  <p>{course.resourceCount} resources available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
