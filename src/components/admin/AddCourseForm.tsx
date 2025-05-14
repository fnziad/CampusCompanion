
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Course } from "@/types";

interface AddCourseFormProps {
  onAddCourse: (course: Course) => void;
}

export function AddCourseForm({ onAddCourse }: AddCourseFormProps) {
  const [newCourse, setNewCourse] = useState<Course>({
    id: "",
    code: "",
    title: "",
    description: "",
    instructor: "",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    resourceCount: 0,
    department: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAddCourse(newCourse);
    
    // Reset form
    setNewCourse({
      id: "",
      code: "",
      title: "",
      description: "",
      instructor: "",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      resourceCount: 0,
      department: ""
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Course</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">Course ID*</Label>
            <Input 
              id="id" 
              name="id"
              placeholder="e.g., cse101" 
              value={newCourse.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Course Code*</Label>
            <Input 
              id="code" 
              name="code"
              placeholder="e.g., CSE101" 
              value={newCourse.code}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Course Title*</Label>
          <Input 
            id="title" 
            name="title"
            placeholder="Introduction to Computer Science" 
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            name="description"
            placeholder="Course description" 
            value={newCourse.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor Name*</Label>
            <Input 
              id="instructor" 
              name="instructor"
              placeholder="Dr. John Doe" 
              value={newCourse.instructor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department*</Label>
            <Input 
              id="department" 
              name="department"
              placeholder="Computer Science" 
              value={newCourse.department}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input 
            id="thumbnail" 
            name="thumbnail"
            placeholder="https://example.com/image.jpg" 
            value={newCourse.thumbnail}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleSubmit}>Add Course</Button>
      </DialogFooter>
    </DialogContent>
  );
}
