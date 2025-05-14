import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourseController } from "@/controllers/CourseController";
import { ResourceController } from "@/controllers/ResourceController";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Link as LinkIcon, Upload, Video } from "lucide-react";
import { Course } from "@/types";
import { toast } from "sonner";

export default function ResourceUpload() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "pdf" as "pdf" | "link" | "video" | "presentation" | "other",
    url: "",
    courseId: courseId || "",
    tags: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>(CourseController.getCourses());
  const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
  
  useEffect(() => {
    // Animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Get current course if courseId is provided
    if (courseId) {
      const { course } = CourseController.getCourseWithResources(courseId);
      setCurrentCourse(course);
    }
    
    return () => clearTimeout(timer);
  }, [courseId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (value: "pdf" | "link" | "video" | "presentation" | "other") => {
    setFormData(prev => ({ ...prev, type: value }));
  };
  
  const handleCourseChange = (value: string) => {
    setFormData(prev => ({ ...prev, courseId: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url || !formData.courseId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const resource = {
      id: `res${Date.now().toString().slice(-6)}`,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      url: formData.url,
      courseId: formData.courseId,
      uploadedBy: user?.id || "",
      uploadDate: new Date().toISOString().split('T')[0],
      approved: user?.role === 'SuperAdmin' || user?.role === 'Moderator',
      ratings: []
    };
    
    // Upload resource
    ResourceController.uploadResource(resource);
    
    toast.success("Resource uploaded successfully!");
    setIsSubmitting(false);
    
    // Navigate back to course page
    navigate(`/courses/${formData.courseId}`);
  };
  
  if (!isAuthenticated || user?.role === 'Guest') {
    toast.error("You must be logged in to upload resources");
    navigate("/login");
    return null;
  }
  
  // Get icon based on resource type
  const getResourceTypeIcon = () => {
    switch(formData.type) {
      case 'pdf':
        return <FileText className="h-16 w-16 text-red-500" />;
      case 'video':
        return <Video className="h-16 w-16 text-blue-500" />;
      case 'link':
        return <LinkIcon className="h-16 w-16 text-green-500" />;
      default:
        return <FileText className="h-16 w-16 text-gray-500" />;
    }
  };
  
  // Check if URL is an image
  const isImageURL = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };
  
  return (
    <div 
      className={`container mx-auto px-4 py-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <Link to={courseId ? `/courses/${courseId}` : "/courses"} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {currentCourse ? currentCourse.title : "Courses"}
        </Link>
        
        <Card className="border border-border/50 shadow-md">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-2xl font-heading flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Resource {currentCourse && `for ${currentCourse.title}`}
            </CardTitle>
            <CardDescription>Share study materials with your fellow students</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., Week 5 Lecture Notes"
                  required
                  className="transition-all border-input/50 focus:border-primary/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe this resource"
                  className="min-h-[100px] transition-all border-input/50 focus:border-primary/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Resource Type <span className="text-destructive">*</span></Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleTypeChange(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {!courseId && (
                  <div className="space-y-2">
                    <Label htmlFor="course">Course <span className="text-destructive">*</span></Label>
                    <Select
                      value={formData.courseId}
                      onValueChange={handleCourseChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>{course.code} - {course.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Resource URL <span className="text-destructive">*</span></Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/resource"
                  required
                  className="transition-all border-input/50 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Please provide a link where this resource is hosted (Google Drive, Dropbox, YouTube, etc.)
                </p>
              </div>
              
              {formData.url && (
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-muted/20">
                  <h3 className="text-sm font-medium mb-2">Resource Preview</h3>
                  {isImageURL(formData.url) ? (
                    <img 
                      src={formData.url} 
                      alt="Resource preview" 
                      className="max-h-40 object-contain"
                      onError={() => toast.error("Could not load image preview")}
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      {getResourceTypeIcon()}
                      <span className="mt-2 text-sm text-muted-foreground">
                        {formData.type.toUpperCase()} Resource
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Optional)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="E.g., midterm, study guide, lecture notes"
                  className="transition-all border-input/50 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas to help others find this resource
                </p>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="flex gap-2 shadow-md hover:shadow-primary/30 transition-all" 
                  disabled={isSubmitting}
                >
                  <Upload className="h-4 w-4" />
                  {isSubmitting ? "Uploading..." : "Upload Resource"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
