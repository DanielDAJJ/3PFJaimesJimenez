import { Injectable } from '@angular/core';
import { Course } from './model/Course';
import { Observable, of } from 'rxjs';
import { ApiService } from '../API/api';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly coursesEndpoint = 'courses';

  constructor(private apiService: ApiService) {}

  getCourses(): Observable<Course[]> {
    return this.apiService.get<Course[]>(this.coursesEndpoint);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.apiService.get<Course>(`${this.coursesEndpoint}/${id}`);
  }

  addCourse(payload: Omit<Course, 'id'>): Observable<Course> {
    return this.apiService.post<Course>(this.coursesEndpoint, payload);
  }

  updateCourse(id: number, payload: Course): Observable<Course> {
    return this.apiService.put<Course>(`${this.coursesEndpoint}/${id}`, payload);
  }

  deleteCourse(id: number): Observable<any> {
    return this.apiService.delete<any>(`${this.coursesEndpoint}/${id}`);
  }
}
