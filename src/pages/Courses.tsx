
import { useState, useEffect } from 'react';
import { CourseController } from '@/controllers/CourseController';
import ResourceSearch from '@/components/courses/ResourceSearch';
import CourseList from '@/components/courses/CourseList';
import { Course } from '@/types';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCourses = () => {
      if (searchQuery) {
        setCourses(CourseController.searchCourses(searchQuery));
      } else {
        setCourses(CourseController.getCourses());
      }
    };

    loadCourses();
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-heading">Course Hub</h1>
        <p className="text-muted-foreground mb-8">Browse and access course resources shared by students and faculty</p>
        
        <div className="space-y-6">
          <ResourceSearch onSearch={setSearchQuery} />
          <CourseList />
        </div>
      </div>
    </div>
  );
}
