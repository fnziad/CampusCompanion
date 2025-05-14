
import coursesData from '@/data/courses.json';
import { Course } from '@/types';

export class CourseModel {
  static getAllCourses(): Course[] {
    return coursesData;
  }

  static getCourseById(id: string): Course | undefined {
    return coursesData.find(course => course.id === id);
  }

  static searchCourses(query: string): Course[] {
    const searchTerm = query.toLowerCase();
    return coursesData.filter(course => 
      course.code.toLowerCase().includes(searchTerm) ||
      course.title.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm)
    );
  }

  static addCourse(course: Course): Course[] {
    // In a real app, this would be an API call
    // For now, we'll just simulate adding to the array in memory
    coursesData.push(course);
    return coursesData;
  }

  static deleteCourse(courseId: string): Course[] {
    // In a real app, this would be an API call
    // For now, we'll just simulate deleting from the array in memory
    const index = coursesData.findIndex(course => course.id === courseId);
    if (index !== -1) {
      coursesData.splice(index, 1);
    }
    return coursesData;
  }
}
