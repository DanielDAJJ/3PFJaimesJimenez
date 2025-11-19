import { Injectable } from '@angular/core';
import { Course } from './model/Course';
import { MOCK_COURSES } from './data/courses.mock';
import { BehaviorSubject, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = MOCK_COURSES;
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor() {
    this.coursesSubject.next(this.courses);
  }
  getCourses() {
    this.coursesSubject.next(this.courses);
  }
  getCourseById(id: number) {
    return of(this.courses.find(course => course.id === id));
  }
  addCourse(course: Course) {
    const newId = this.courses.length > 0 ? this.courses[this.courses.length - 1].id + 1 : 1;
    course.id = newId;
    this.courses.push(course);
    this.coursesSubject.next(this.courses);
  }
  updateCourse(updatedCourse: Course) {
    const updatedCourses = this.courses.map((c)=> (c.id === updatedCourse.id ? updatedCourse : c));
    this.courses = updatedCourses;
    this.coursesSubject.next(this.courses);
  }
  deleteCourse(courseId: number) {
    const filteredCourses = this.courses.filter((c)=> (c.id !== courseId));
    this.courses = filteredCourses;
    this.coursesSubject.next(this.courses);
  }
}
