
import { Course } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
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
        <Link to={`/courses/${course.id}`} className="text-primary text-sm hover:underline">
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
