
import { CourseModel } from '@/models/CourseModel';
import { ResourceModel } from '@/models/ResourceModel';
import { Course, Resource } from '@/types';

export class CourseController {
  static getCourses(): Course[] {
    return CourseModel.getAllCourses();
  }

  static getCourseWithResources(courseId: string): { course: Course | undefined, resources: Resource[] } {
    const course = CourseModel.getCourseById(courseId);
    const resources = ResourceModel.getResourcesByCourse(courseId);
    return { course, resources };
  }

  static searchCourses(query: string): Course[] {
    return CourseModel.searchCourses(query);
  }

  static addCourse(course: Course): Course[] {
    return CourseModel.addCourse(course);
  }

  static deleteCourse(courseId: string): Course[] {
    return CourseModel.deleteCourse(courseId);
  }
}
