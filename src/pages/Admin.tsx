
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CourseController } from "@/controllers/CourseController";
import usersData from "@/data/users.json";
import { Course } from "@/types";

// Import the new components
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { CourseManagementTable } from "@/components/admin/CourseManagementTable";
import { AddCourseForm } from "@/components/admin/AddCourseForm";
import { AdminDashboardCards } from "@/components/admin/AdminDashboardCards";
import { SystemSettings } from "@/components/admin/SystemSettings";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersData);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Redirect if not logged in as Super Admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'SuperAdmin') {
      navigate("/");
    }
    
    // Load courses
    setCourses(CourseController.getCourses());
  }, [isAuthenticated, user, navigate]);
  
  if (!user || user.role !== 'SuperAdmin') {
    return null; // Will redirect via the useEffect
  }
  
  const handleAddCourse = (newCourse: Course) => {
    // Validate form inputs
    if (!newCourse.id || !newCourse.code || !newCourse.title || !newCourse.instructor || !newCourse.department) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check if course with same ID already exists
    if (courses.some(c => c.id === newCourse.id)) {
      toast.error("A course with this ID already exists");
      return;
    }
    
    const updatedCourses = CourseController.addCourse(newCourse);
    setCourses(updatedCourses);
    toast.success("Course added successfully");
  };
  
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      const updatedCourses = CourseController.deleteCourse(courseId);
      setCourses(updatedCourses);
      toast.success("Course deleted successfully");
    }
  };
  
  // Calculate stats for dashboard cards
  const activeUserCount = users.filter(u => u.status === "active").length;
  const hibernatedUserCount = users.filter(u => u.status === "hibernated").length;
  const departmentCount = new Set(courses.map(c => c.department)).size;
  const moderatorCount = users.filter(u => u.role === "Moderator").length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-heading">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">System management and overview</p>
        
        <AdminDashboardCards
          userCount={users.length}
          activeUserCount={activeUserCount}
          hibernatedUserCount={hibernatedUserCount}
          courseCount={courses.length}
          departmentCount={departmentCount}
          resourceCount={7}
          approvedResourceCount={6}
          pendingResourceCount={1}
          moderatorCount={moderatorCount}
        />
        
        <Tabs defaultValue="users" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <UserManagementTable users={users} setUsers={setUsers} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Management</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Course
                    </Button>
                  </DialogTrigger>
                  <AddCourseForm onAddCourse={handleAddCourse} />
                </Dialog>
              </CardHeader>
              <CardContent>
                <CourseManagementTable 
                  courses={courses} 
                  onDeleteCourse={handleDeleteCourse} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
