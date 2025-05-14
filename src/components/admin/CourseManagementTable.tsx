
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";

interface CourseManagementTableProps {
  courses: Course[];
  onDeleteCourse: (courseId: string) => void;
}

export function CourseManagementTable({ courses, onDeleteCourse }: CourseManagementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Resources</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.code}</TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.instructor}</TableCell>
            <TableCell>{course.department}</TableCell>
            <TableCell>{course.resourceCount}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => onDeleteCourse(course.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
